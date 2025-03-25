/**
 * This section will format the default currency to the specified one
 * 
 */

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(amount);
};

module.exports = formatCurrency;