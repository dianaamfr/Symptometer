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

router.get("/:id/name", async (req, res) => {
  let diseaseId = req.params.id
  const query = 
    prefix +
    ' SELECT ?diseaseName ?definition ?icds\n\
      WHERE { \n\
        ?diseaseID oboinowl:id "' + diseaseId + '" . \n\
        ?diseaseID rdfs:label ?diseaseName . \n\
        ?diseaseID doid:IAO_0000115 ?definition . \n\
        OPTIONAL { \n\
        { \n\
          SELECT ?diseaseID (GROUP_CONCAT(?icd;SEPARATOR=",") AS ?icds) \n\
          WHERE { \n\
            ?diseaseID oboinowl:hasDbXref ?icd . \n\
            FILTER(STRSTARTS(STR(?icd), "ICD10CM:")) \n\
          } GROUP BY ?diseaseID \n\
        }} \n\
      }';

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

router.get("/:id/exactSynonyms", async (req, res) => {
  let diseaseId = req.params.id
  const query = 
    prefix +
      'SELECT DISTINCT ?exactSynonym \n\
      WHERE { \n\
        ?diseaseID oboinowl:id "' + diseaseId + '" . \n\
        ?diseaseID oboinowl:hasExactSynonym ?exactSynonym . \n\
    }';

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

router.get("/:id/relatedSynonyms", async (req, res) => {
  let diseaseId = req.params.id
  const query = 
    prefix +
      'SELECT DISTINCT ?hasRelatedSynonym \n\
      WHERE { \n\
        ?diseaseID oboinowl:id "' + diseaseId + '" . \n\
        ?diseaseID oboinowl:hasRelatedSynonym ?hasRelatedSynonym . \n\
    }';

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

router.get("/:id/group", async (req, res) => {
  let diseaseId = req.params.id
  const query = 
    prefix +
      'SELECT DISTINCT ?groupName \n\
        WHERE { \n\
          ?diseaseID rdfs:label ?diseaseName . \n\
          ?diseaseID rdfs:subClassOf ?classID . \n\
          ?classID rdfs:label ?groupName . \n\
          ?diseaseID oboinowl:id "' + diseaseId + '" . \n\
      }';

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

router.get("/:id/groupOfGroup", async (req, res) => {
  let diseaseId = req.params.id
  const query = 
    prefix +
      'SELECT DISTINCT ?groupGroupName \n\
      WHERE { \n\
        ?diseaseID rdfs:label ?diseaseName . \n\
        ?diseaseID rdfs:subClassOf ?classID . \n\
        ?classID rdfs:label ?groupName . \n\
        ?classID rdfs:subClassOf ?groupClassID . \n\
        ?groupClassID rdfs:label ?groupGroupName . \n\
        ?diseaseID oboinowl:id "'  + diseaseId + '" . \n\
    }';

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

router.get("/:id/symptoms", async (req, res) => {
  let diseaseId = req.params.id
  const query = 
    prefix +
      'SELECT DISTINCT ?symptomName \n\
      WHERE { \n\
        ?diseaseID rdfs:label ?diseaseName . \n\
        ?diseaseID rdfs:subClassOf ?restriction . \n\
        ?restriction owl:onProperty doid:RO_0002452 . \n\
        ?restriction owl:someValuesFrom ?symptomID . \n\
        ?symptomID rdfs:label ?symptomName . \n\
        ?diseaseID oboinowl:id "' + diseaseId + '" . \n\
      }';

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


router.get("/:id/bodyPart", async (req, res) => {
  let diseaseId = req.params.id
  const query = 
    prefix +
      'SELECT DISTINCT ?location \n\
      WHERE { \n\
        ?diseaseID oboinowl:id "' + diseaseId + '" . \n\
        ?diseaseID rdfs:subClassOf ?restriction . \n\
        ?restriction owl:onProperty doid:RO_0004026 . \n\
        ?restriction owl:someValuesFrom ?locationID . \n\
        ?locationID rdfs:label ?location . \n\
      }';

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
