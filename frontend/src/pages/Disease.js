import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDiseaseGroup } from "../utils/icd10_codes.js";

function DiseasePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL + "/disease/" + id;
  const [nameResults, setNameResults] = useState([]);
  const [exactSynonymsResults, setExactSynonymsResults] = useState([]);
  const [relatedSynonymsResults, setRelatedSynonymsResults] = useState([]);
  const [groupResults, setGroupResults] = useState([]);
  const [groupOfGroupResults, setGroupOfGroupResults] = useState([]);
  const [symptomsResults, setSymptomsResults] = useState([]);
  const [bodyPart, setBodyPart] = useState([]);

  async function backToHomePage() {
    navigate("/");
  }

  async function goToGroupPage(groupId) {
    navigate("/group/" + groupId);
  }

  //Get disease details
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(backendUrl + "/name", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let results = data.results.bindings;
        addDiseaseGroup(results);
        setNameResults(results);
        return results;
      })
      .then(async (results) => {
        if (results.length === 0) {
          navigate("/");
        }

        fetch(backendUrl + "/exactSynonyms", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let results = data.results.bindings;
            setExactSynonymsResults(results);
          });
        fetch(backendUrl + "/relatedSynonyms", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let results = data.results.bindings;
            setRelatedSynonymsResults(results);
          });
        fetch(backendUrl + "/group", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let results = data.results.bindings;
            setGroupResults(results);
          });
        fetch(backendUrl + "/groupOfGroup", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let results = data.results.bindings;
            setGroupOfGroupResults(results);
          });
        fetch(backendUrl + "/bodyPart", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let results = data.results.bindings;
            setBodyPart(results);
          });
        fetch(backendUrl + "/symptoms", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let results = data.results.bindings;
            setSymptomsResults(results);
          });
      });
  }, [backendUrl, id]);

  return (
    <Container fluid="md">
      <Row className="mt-5">
        <Col className="col-2">
          <button>
            <img
              alt=""
              onClick={backToHomePage}
              src={require("../assets/logo.png")}
            />
          </button>
        </Col>
      </Row>
      <Row className="px-3 mr-0">
        <div
          className="mx-0 mt-3 px-3 relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6"
          // href=""
        >
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 to-blue-500"></span>

          <div className="justify-between sm:flex mr-5">
            <Col className="col-9">
              <div>
                <h5 className="text-xl font-bold text-slate-900 capitalize">
                  {nameResults.length === 0
                    ? ""
                    : nameResults.map((result) => result.diseaseName.value)}
                </h5>
              </div>

              <div className="mt-1 sm:pr-8">
                <p className="text-sm text-slate-500">
                  {nameResults.length === 0
                    ? ""
                    : nameResults.map((result) => result.definition.value)}
                </p>
              </div>

              <dl className="flex mt-3">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-600">
                    Also Known As:
                  </dt>
                  <dd className="text-xs text-slate-500 capitalize">
                    {exactSynonymsResults.length === 0
                      ? ""
                      : exactSynonymsResults.map(
                          (result, index) =>
                            result.exactSynonym.value +
                            (index < exactSynonymsResults.length - 1
                              ? ", "
                              : "") +
                            (index === exactSynonymsResults.length - 1 &&
                            relatedSynonymsResults.length > 0
                              ? ", "
                              : "")
                        )}
                    {relatedSynonymsResults.length === 0 && exactSynonymsResults.length === 0
                      ? "No information available"
                      : relatedSynonymsResults.map(
                          (result, index) =>
                            result.hasRelatedSynonym.value +
                            (index < relatedSynonymsResults.length - 1
                              ? ", "
                              : "")
                        )}
                  </dd>
                </div>
              </dl>

              <dl className="flex mt-3">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-600">
                    Disease Group
                  </dt>
                  <dd className="text-xs text-slate-500 capitalize">
                    {nameResults.length === 0
                      ? ""
                      : nameResults.map((result) => result.group)}
                    {/* {groupResults.length === 0 ? "" : groupResults.map((result, index) => result.groupName.value + (index < groupResults.length - 1 ? ", " : ""))} */}
                  </dd>
                </div>
              </dl>

              <dl className="flex mt-3">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-600">
                    Part of the Body
                  </dt>
                  <dd className="text-xs text-slate-500 capitalize">
                    {bodyPart.length === 0
                      ? "No information available"
                      : bodyPart.map(
                          (result, index) =>
                            result.location.value +
                            (index < bodyPart.length - 1 ? ", " : "")
                        )}
                  </dd>
                </div>
              </dl>

              <dl className="flex mt-3">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-600 mb-1">
                    See Also
                  </dt>
                  <div className="flex flex-row">
                    {groupResults.length === 0
                      ? ""
                      : groupResults.map((result, index) => (
                          <button
                            onClick={() => {
                              goToGroupPage(result.doid.value);
                            }}
                            key={`see_also_${index}`}
                            className="border border-teal-500 text-sm text-slate-600 block rounded-sm mr-3 p-1 flex items-center hover:bg-teal-500 hover:text-white capitalize"
                          >
                            {result.groupName.value}
                          </button>
                        ))}
                  </div>
                </div>
              </dl>
            </Col>
            <Col className="col-3">
              <div className="flex-shrink-0 hidden ml-3 sm:block">
                <h6 className="text font-bold text-slate-900">Symptoms</h6>
                {symptomsResults.length === 0
                  ? "No symptoms on database"
                  : symptomsResults.map((result, index) => (
                      <p
                        key={result.symptomName.value + index}
                        className="mt-1 mb-0 text-xs font-medium text-slate-600 capitalize"
                      >
                        {result.symptomName.value}
                      </p>
                    ))}
              </div>
            </Col>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default DiseasePage;
