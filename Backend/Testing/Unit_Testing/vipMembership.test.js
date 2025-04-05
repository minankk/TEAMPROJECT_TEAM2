require("dotenv").config();

jest.mock("../../db", () => ({
    execute: jest.fn(),
}));

const db = require("../../db");
const vipController = require("../../controllers/membershipController");
const dashboardController = require("../../controllers/dashboardController");

jest.mock("../../controllers/dashboardController", () => ({
    genBenefitsDiscount: jest.fn(),
}));

describe("VIP Controller", () => {
    let req, res;
    let consoleErrorSpy;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            user: { user_id: 1 },
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); 
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore(); 
    });

    // should return to the payment gateway
    describe("redirectToPaymentGateway", () => {
        test("should return redirect URL", () => {
            vipController.redirectToPaymentGateway(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Redirecting to payment gateway...",
                paymentGatewayURL: "https://mockpaymentgateway.com/checkout",
            });
        });
    });

    
    describe("processPayment", () => {
        //payment method and amount is missing
        test("should return 400 if payment method or amount is missing", async () => {
            req.body = { paymentMethod: null, amount: null };
            await vipController.processPayment(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Payment method and amount are required." });
        });

        //payment process successfully - positive flow
        test("should process payment successfully", async () => {
            req.body = { paymentMethod: "card", amount: 100 };
            jest.spyOn(Math, "random").mockReturnValue(0.9);
            db.execute.mockResolvedValue();

            await vipController.processPayment(req, res);

            expect(db.execute).toHaveBeenCalledWith("UPDATE users SET membership_status = 'vip' WHERE user_id = ?", [1]);
            expect(db.execute).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO membership_payments"),
                expect.arrayContaining([1, 100, "card"])
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Payment successful! You are now a VIP member." });
        });

        //payment process with different payment method 
        test("should process payment with different payment method", async () => {
            req.body = { paymentMethod: "paypal", amount: 150 };
            jest.spyOn(Math, "random").mockReturnValue(0.9);
            db.execute.mockResolvedValue();
    
            await vipController.processPayment(req, res);
    
            expect(db.execute).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO membership_payments"),
                expect.arrayContaining([1, 150, "paypal"])
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Payment successful! You are now a VIP member." });
        });

        //payment fails
        test("should return 400 if payment fails", async () => {
            req.body = { paymentMethod: "card", amount: 100 };
            jest.spyOn(Math, "random").mockReturnValue(0.1);

            await vipController.processPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Payment failed. Please try again." });
        });

        //server error
        test("should return 500 on exception", async () => {
            req.body = { paymentMethod: "card", amount: 100 };
            jest.spyOn(Math, "random").mockReturnValue(0.9);
            db.execute.mockRejectedValue(new Error("DB Error"));

            await vipController.processPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error." });
        });
    });

    describe("checkoutAsVIP", () => {
        //user not found
        test("should return 404 if user not found", async () => {
            db.execute.mockResolvedValueOnce([[]]);
            await vipController.checkoutAsVIP(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        //non vip user
        test("should return checkout info for non-VIP user", async () => {
            db.execute
                .mockResolvedValueOnce([[{ membership_status: "user", total_spent: 0 }]])
                .mockResolvedValueOnce([[{ cart_total: 200 }]]);

            await vipController.checkoutAsVIP(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Checkout successful",
                membershipTier: "No VIP",
                originalTotal: 200,
                discountApplied: 0,
                discountedTotal: 200,
            });
        });

        //vip user with benefits
        test("should return discounted checkout for VIP user", async () => {
            db.execute
                .mockResolvedValueOnce([[{ membership_status: "vip", total_spent: 500 }]])
                .mockResolvedValueOnce([[{ cart_total: 200 }]]);
            dashboardController.genBenefitsDiscount.mockReturnValue({ tier: "Gold", discount: 0.2 });

            await vipController.checkoutAsVIP(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Checkout successful",
                membershipTier: "Gold",
                originalTotal: 200,
                discountApplied: 20,
                discountedTotal: 160,
            });
        });

        //large spent vip user
        test("should handle checkout with large total spent", async () => {
            db.execute
                .mockResolvedValueOnce([[{ membership_status: "vip", total_spent: 10000 }]])
                .mockResolvedValueOnce([[{ cart_total: 500 }]]);
            dashboardController.genBenefitsDiscount.mockReturnValue({ tier: "Platinum", discount: 0.5 });
    
            await vipController.checkoutAsVIP(req, res);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Checkout successful",
                membershipTier: "Platinum",
                originalTotal: 500,
                discountApplied: 50,
                discountedTotal: 250,
            });
        });

        //to check the dashboard flow
        test("should call genBenefitsDiscount with total spent", async () => {
            db.execute
                .mockResolvedValueOnce([[{ membership_status: "vip", total_spent: 750 }]])
                .mockResolvedValueOnce([[{ cart_total: 100 }]]);
    
            await vipController.checkoutAsVIP(req, res);
    
            expect(dashboardController.genBenefitsDiscount).toHaveBeenCalledWith(750);
        });

        //server error
        test("should return 500 on error", async () => {
            db.execute.mockRejectedValue(new Error("DB error"));
            await vipController.checkoutAsVIP(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error." });
        });
    });
});