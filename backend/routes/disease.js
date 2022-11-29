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

router.get("/bySymptoms", async (req, res) => {
  let symptoms = JSON.parse(req.query.symptoms);
  symptoms = symptoms.map((e) => {
    return `'${e}'`;
  });
  const symptomsValues = symptoms.join(" ");
  const query =
    prefix +
    ` SELECT ?diseaseName ?definition ?icds ?doid \n\
      WHERE { \n\
        ?diseaseID rdfs:label ?diseaseName . \n\
        ?diseaseID doid:IAO_0000115 ?definition . \n\
        ?diseaseID oboinowl:id ?doid . \n\
        { \n\
          SELECT ?diseaseID (GROUP_CONCAT(?icd;SEPARATOR=",") AS ?icds) \n\
          WHERE { \n\
            ?diseaseID rdfs:subClassOf ?restriction . \n\
            ?diseaseID oboinowl:hasDbXref ?icd . \n\
            ?restriction owl:onProperty doid:RO_0002452 . \n\
            ?restriction owl:someValuesFrom ?symptomID . \n\
            ?symptomID rdfs:label ?symptoms . \n\
            VALUES ?symptoms {${symptomsValues}} \n\
            FILTER(STRSTARTS(STR(?icd), "ICD10CM:")) \n\
          } GROUP BY ?diseaseID \n\
          ORDER BY DESC(COUNT(?symptomID)) ?diseaseName \n\
        }\n\
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
      return res.json(jenaResponse.data);
    })
    .catch((err) => {
      return res.json(err);
    });
});

router.get("/byAllSymptoms", async (req, res) => {
  let symptoms = JSON.parse(req.query.symptoms);
  symptoms = symptoms.map((e) => {
    return `'${e}'`;
  });
  const symptomsQuery = buildSymptomsQuery(symptoms);

  const query =
    prefix +
    ` SELECT ?diseaseName ?definition ?icds ?doid \n\
      WHERE { \n\
        ?diseaseID rdfs:label ?diseaseName . \n\
        ?diseaseID doid:IAO_0000115 ?definition . \n\
        ?diseaseID oboinowl:id ?doid . \n\
        { \n\
          SELECT ?diseaseID (GROUP_CONCAT(?icd;SEPARATOR=",") AS ?icds) \n\
          WHERE { \n\
            ${symptomsQuery} \n\
            ?diseaseID oboinowl:hasDbXref ?icd . \n\
            FILTER(STRSTARTS(STR(?icd), "ICD10CM:")) \n\
          } GROUP BY ?diseaseID \n\
          ORDER BY DESC(COUNT(?symptomID)) ?diseaseName \n\
        }\n\
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
      return res.json(jenaResponse.data);
    })
    .catch((err) => {
      return res.json(err);
    });
});

function buildSymptomsQuery(symptoms) {
  return symptoms
    .map((symptom, i) => {
      return `?diseaseID rdfs:subClassOf ?restriction${i} . \n\
    ?restriction${i} owl:onProperty doid:RO_0002452 . \n\
    ?restriction${i} owl:someValuesFrom ?symptomID${i} . \n\
    ?symptomID${i} rdfs:label ${symptom} . \n\ `;
    })
    .join("");
}

module.exports = router;
