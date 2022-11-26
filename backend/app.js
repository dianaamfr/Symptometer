const express = require('express');
const router = express.Router();
const app = express();
const diseaseRoute = require('./routes/disease');
const symptomRoute = require('./routes/symptom');

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/disease', diseaseRoute);

app.use('/symptom', symptomRoute);

app.listen(process.env.PORT || 8000);