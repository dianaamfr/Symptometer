import React, { useEffect, useState } from "react";
import DiseaseCard from "../components/disease_card.js";
import Symptoms from "../components/symptoms_card";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import getDiseaseGroup from "../utils/icd10_codes.js";

function Results() {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL + "/disease/bySymptoms";
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryResults, setQueryResults] = useState([]);

  function addDiseaseGroup(diseases) {
    diseases.forEach(element => {
      element.group = getDiseaseGroup(element.icd.value);
    }); 
  }

  // Get results
  useEffect(() => { 
    const params = new URLSearchParams({
      symptoms: JSON.stringify(searchParams.getAll("query")),
    }).toString();

    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(backendUrl + "?" + params, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let results = data.results.bindings;
        addDiseaseGroup(results);
        setQueryResults(results);
      });
  }, [searchParams]);

  async function handleSubmit(event) {
    event.preventDefault();
    let query = event.currentTarget.elements.query.value;
    let queryArray = query.split(",");
    var params = new URLSearchParams(queryArray.map(s =>['query',s]))
    setSearchParams(params);
  }

  async function backToHomePage() {
    navigate('/');
  }

  return (
    <Container fluid="md">
      <Row className="mt-5">
        <Col className="col-2">
          <button>
            <img onClick={backToHomePage} src={require("../assets/logo.png")} />
          </button>
        </Col>
        <Col className="p-0 flex items-center">
          <div className="w-[100%] mr-0 flex items-center rounded-full border hover:shadow-md">
            <div className="pl-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <form className="w-full bg-transparent rounded-full outline-none" onSubmit={handleSubmit}>
              <input
                id="query"
                type="text"
                className="w-full bg-transparent rounded-full py-2 pl-4 outline-none"
              />
              <input type="submit" hidden />
            </form>
          </div>
        </Col>
      </Row>
      <Row className="mt-3 ">
        <nav className=" mr-0 flex flex-col sm:flex-row">
          <button className="text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
            At least one symptom
          </button>
          <button className="text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none">
            All symptoms
          </button>
         
        </nav>
      </Row>
      <Row className="pr-0 mr-0">
        <Col className="col-9 pr-0 mr-0">
          {queryResults.map((disease, index) => 
            <DiseaseCard key={disease.diseaseName.value + index} disease={disease} />)}
          {/* <DiseaseCard />
          <DiseaseCard />
          <DiseaseCard /> */}
        </Col>
        <Col className="p-0 col-3">
          <Symptoms />
        </Col>
      </Row>
    </Container>
  );
}

export default Results;
