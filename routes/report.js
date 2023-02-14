//eden cohen 208499475, yarden horowitz 314621657

var express = require('express');
var router = express.Router();
const database = require("../database");

router.get('/',async function(req, res, next) {
    let report = ''
    try {
        report = await database.getReport(req.query.user_id, req.query.year, req.query.month)
    } catch (e) {
        const errorMessage = "An error has occurred";
        console.log(errorMessage);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(report,null,'\t'));
});

module.exports = router;