const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const ontologyUrl = process.env.FUSEKI_URL;
const prefix = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n ';
const myQuery = prefix + ' SELECT ?diseaseID ?diseaseName \n\
  WHERE { \n\
    ?diseaseID rdfs:label ?diseaseName . \n\
    ?diseaseID rdfs:subClassOf ?disease . \n\
  } LIMIT 10';

router.get('/', async (req, res) => {
  await axios({
      url: ontologyUrl,
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json'
      },
      params: {query: myQuery}
    }).then((jenaResponse) => {
        return res.json(jenaResponse.data);
      })
      .catch((err) => {
        return res.json(err);
      });
});

module.exports = router;