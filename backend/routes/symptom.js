const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const ontologyUrl = process.env.FUSEKI_URL;
const prefix =
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
  PREFIX owl: <http://www.w3.org/2002/07/owl#> \n\
  PREFIX doid: <http://purl.obolibrary.org/obo/> \n\
  PREFIX oboinowl: <http://www.geneontology.org/formats/oboInOwl#>";

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

router.get('/', async (req, res) => {
  const query =
    prefix +
    `SELECT DISTINCT ?symptom \n\
    WHERE { \n\
      ?diseaseID rdfs:subClassOf ?restriction . \n\
      ?restriction owl:onProperty doid:RO_0002452 . \n\
      ?restriction owl:someValuesFrom ?symptomID . \n\
      ?symptomID rdfs:label ?symptom . \n\
    }`;

  await axios({
    url: ontologyUrl,
    method: "GET",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Accept: "application/sparql-results+json",
    },
    params: { query: query },
  })
    .then((jenaResponse) => {
      return res.json(parseSymptomsResult(jenaResponse.data.results.bindings));
    })
    .catch((err) => {
      return res.json(err);
    });
});

function parseSymptomsResult(response) {
  const symptoms = [];
  response.forEach((symptom, idx) => {
    symptoms.push({ id: idx, name: symptom.symptom.value});
  }); 
  return symptoms;
}

module.exports = router;
