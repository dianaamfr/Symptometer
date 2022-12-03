import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function DiseaseCard({ disease }) {
  const navigate = useNavigate();

  const backendUrl =
    process.env.REACT_APP_BACKEND_URL + "/disease/" + disease.doid.value;
  const [symptomsResults, setSymptomsResults] = useState([]);

  async function goToDiseasePage(){
      let diseaseId = disease.doid.value
      navigate('/disease/' + diseaseId);
  }

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(backendUrl + "/symptoms", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let results = data.results.bindings;
        setSymptomsResults(results.slice(0, 3));
      });
  }, [backendUrl]);



  return (
    <div className="hover:bg-gray-400 hover:bg-opacity-10 mx-0 mt-3 relative block p-8 overflow-hidden border border-slate-100 rounded-lg ml-6 mr-6">
      <button className="flex text-left" onClick={goToDiseasePage}>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 to-blue-500"></span>

        <div className="justify-between sm:flex">
          <Col className="col-9">
            <div>
              <h5 className="text-xl font-bold text-slate-900 capitalize">
                {disease.diseaseName.value}
              </h5>
              <p className="mt-1 text-xs font-medium text-slate-600">
                Disease Group:{" "}
                {disease.group.map((value, idx) => (
                  <span key={`disease-group-${idx}`} >
                    {value} {idx !== disease.group.length-1 ? "," : ""}
                  </span>
                ))}
              </p>
            </div>
            <div className="mt-1 sm:pr-8">
              <p className="text-sm text-slate-500">
              {disease.definition.value.substring(0, 200)}...
              </p>
            </div>
          </Col>
          <Col className="col-3">
            <div className="flex-shrink-0 hidden ml-3 sm:block">
              <h6 className="text font-bold text-slate-900">Symptoms</h6>
              {symptomsResults.length === 0 ? (
                <p className="mt-1 mb-0 text-xs font-medium text-slate-600 capitalize">
                    "No information available"
                </p>) : symptomsResults.map((result, index) => 
                <p key={result.symptomName.value + index} className="mt-1 mb-0 text-xs font-medium text-slate-600 capitalize">
                  {result.symptomName.value}
                </p>
              )}
              {symptomsResults.length >= 3 ?
                <p className="mt-1 mb-0 text-xs font-medium text-slate-600 capitalize">
                    ...
                </p>
              : null}
            </div>
          </Col>
        </div>
      </button>
    </div>
  );
}

export default DiseaseCard;
