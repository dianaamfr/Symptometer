const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const ontologyUrl = process.env.FUSEKI_URL;
const prefix = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
                PREFIX owl: <http://www.w3.org/2002/07/owl#> \n\
                PREFIX doid: <http://purl.obolibrary.org/obo/>";

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

router.get("/bySymptoms", async (req, res) => {
  let symptoms = JSON.parse(req.query.symptoms);
  symptoms = symptoms.map((e) => { return `'${e}'`;});
  const symptomsValues = symptoms.join(" ");
  console.log(symptomsValues)
  const query = prefix +
    ` SELECT ?diseaseName \n\
      WHERE { \n\
      ?diseaseID rdfs:label ?diseaseName . \n\
      ?diseaseID rdfs:subClassOf ?restriction . \n\
      ?restriction owl:onProperty doid:RO_0002452 . \n\
      ?restriction owl:someValuesFrom ?symptomID . \n\
      ?symptomID rdfs:label ?symptoms . \n\
      VALUES ?symptoms {${symptomsValues}} \n\
    } GROUP BY ?diseaseName \n\
    ORDER BY DESC(COUNT(?symptomID))`;

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

module.exports = router;
