const express = require("express");
const router = express.Router();

//Get route .... for normal practice we can remove or update based on our requirements
router.get("/",(req , res) => {
    res.send("<h1>Welcome to our Team Project -Vinyl Valut , Ecommerce music selling website</h1>")
   })

   //Used to export all the  functionality  from this file so it can be used in another file.
   module.exports = router;