//eden cohen 208499475, yarden horowitz 314621657

var express = require('express');
var router = express.Router();
const database = require("../database");


router.post('/',async function(req, res, next) {
    try {
        await database.addCost(req.query.user_id, req.query.year, req.query.month, req.query.day, req.query.description, req.query.category, req.query.sum);
    } catch (e) {
        const errorMessage = "An error has occurred";
        console.log(errorMessage);
    }
    res.end();
});

module.exports = router;