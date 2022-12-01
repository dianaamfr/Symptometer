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

router.get("/", async (req, res) => {
  const query =
    prefix +
    `SELECT DISTINCT ?symptom \n\
    WHERE { \n\
      ?diseaseID rdfs:subClassOf ?restriction . \n\
      ?restriction owl:onProperty doid:RO_0002452 . \n\
      ?restriction owl:someValuesFrom ?symptomID . \n\
      ?symptomID rdfs:label ?symptom . \n\
    } \n\
    ORDER BY DESC(?symptom)`;

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

router.get("/related", async (req, res) => {
  let symptoms = JSON.parse(req.query.symptoms);
  symptoms = symptoms.map((e) => {
    return `'${e}'`;
  });
 
  const symptomsQuery = buildSymptomsQuery(symptoms);
  const query =
    prefix +
    `SELECT ?relatedSymptom \n\
    WHERE { \n\
      ${symptomsQuery} \n\
      ?diseaseID rdfs:subClassOf ?restRelated . \n\
      ?restRelated owl:onProperty doid:RO_0002452 . \n\
      ?restRelated owl:someValuesFrom ?relatedSymptomID . \n\
      ?relatedSymptomID rdfs:label ?relatedSymptom. \n\
    } \n\
    GROUP BY ?relatedSymptom \n\
    ORDER BY DESC(COUNT(?relatedSymptom)) \n\
    LIMIT 5`;

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
      return res.json(jenaResponse.data.results.bindings);
    })
    .catch((err) => {
      return res.json(err);
    });
});

function parseSymptomsResult(response) {
  const symptoms = [];
  response.forEach((symptom, idx) => {
    symptoms.push({ id: idx, name: symptom.symptom.value });
  });
  return symptoms;
}

function buildSymptomsQuery(symptoms) {
  let symptomsQuery = symptoms
    .map((symptom, i) => {
      return `?diseaseID rdfs:subClassOf ?restriction${i} . \n\
    ?restriction${i} owl:onProperty doid:RO_0002452 . \n\
    ?restriction${i} owl:someValuesFrom ?symptomID${i} . \n\
    ?symptomID${i} rdfs:label ${symptom} . \n\ `;
    })
    .join("");

  let filter = `FILTER (`;
  symptoms.forEach((symptom, i) => {
    filter += `?relatedSymptom != ${symptom}`;
    if (i < symptoms.length - 1) {
      filter += ` && `;
    }
  });
  filter += `)`;

  return symptomsQuery + filter;
}

module.exports = router;
