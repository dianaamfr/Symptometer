const express = require('express');
const app = express();
const diseaseOntologyRoute = require('./routes/disease-ontology');

app.use('/', diseaseOntologyRoute);

app.listen(process.env.PORT || 8000);