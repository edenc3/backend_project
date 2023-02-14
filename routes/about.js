//eden cohen 208499475, yarden horowitz 314621657

var express = require('express');
var router = express.Router();
const database = require('../database');


router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify([{"firstname":"Eden", "lastname":"Cohen","id":208499475,"email":"edencohen020@gmail.com"},
    {"firstname":"Yarden","lastname":"Horowitz","id":314621657,"email":"yarden218@gmail.com"}]));
});

module.exports = router;
