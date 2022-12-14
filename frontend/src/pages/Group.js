import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function GroupPage() {
  const { id } = useParams();
  const [nameResults, setNameResults] = useState([]);
  const [exactSynonymsResults, setExactSynonymsResults] = useState([]);
  const [groupResults, setGroupResults] = useState([]);
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL + "/disease/" + id;

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
        setNameResults(results);
      });
    fetch(backendUrl + "/exactSynonyms", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let results = data.results.bindings;
        setExactSynonymsResults(results);
      });
    fetch(backendUrl + "/group", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let results = data.results.bindings;
        setGroupResults(results);
      });
  }, [backendUrl, id]);

  return (
    <Container fluid="md">
      <Row className="mt-5">
        <Col className="col-2">
          <a href="/">
            <img
              alt=""
              src={require("../assets/logo.png")}
            />
          </a>
        </Col>
      </Row>
      <Row className="px-3 mr-0">
        <div
          className="mx-0 mt-3 px-3 relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6"
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
                      ? "No information available"
                      : exactSynonymsResults.map(
                          (result, index) =>
                            result.exactSynonym.value +
                            (index < exactSynonymsResults.length - 1
                              ? ", "
                              : "")
                    )}
                  </dd>
                </div>
              </dl>
              {groupResults.length !== 0 ? (
                <dl className="flex mt-3">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-600 mb-1">
                    See Also
                  </dt>
                  <div className="flex flex-row">
                    {groupResults.length === 0
                      ? ""
                      : groupResults.map((result, index) => (
                          <Link to={`/group/${result.doid.value}`} 
                            style={{ textDecoration: 'none' }}
                            key={`see_also_${index}`}
                            className="border border-teal-500 text-sm text-slate-600 block rounded-sm mr-3 p-1 flex items-center hover:bg-teal-500 hover:text-white capitalize"
                          >
                            {result.groupName.value}
                          </Link>
                        ))}
                  </div>
                </div>
              </dl>): null}
            </Col>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default GroupPage;
