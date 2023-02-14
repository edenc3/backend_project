var express = require('express');
var router = express.Router();
const database = require('../database');


router.get('/about', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify([{"firstname":"Eden", "lastname":"Cohen","id":208499475,"email":"edencohen020@gmail.com"},
    {"firstname":"Yarden","lastname":"Horowitz","id":314621657,"email":"yarden218@gmail.com"}]));
});

router.post('/addcost',async function(req, res, next) {

  try {
    await database.addCost(req.query.user_id, req.query.year, req.query.month, req.query.day, req.query.description, req.query.category, req.query.sum);
  } catch (e) {
    // TODO: return error to user
    console.log(e);
  }
  res.end();
});

router.get('/report',async function(req, res, next) {
  let report = ''
  try {
    report = await database.getReport(req.query.user_id, req.query.year, req.query.month)
  } catch (e) {
    // TODO: return error to user
    console.log(e);
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(report,null,'\t'));
});

module.exports = router;
