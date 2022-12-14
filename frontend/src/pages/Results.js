import React, { useEffect, useState, useRef } from "react";
import DiseaseCard from "../components/disease_card.js";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useSearchParams } from "react-router-dom";
import { addDiseaseGroup } from "../utils/icd10_codes.js";
import ReactTags from "react-tag-input-custom-search";
import searchClassNames from "../utils/searchClasses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';


function Results() {
  const diseasesSomeSymptomsUrl =
    process.env.REACT_APP_BACKEND_URL + "/disease/bySymptoms";
  const diseasesAllSymptomsUrl =
    process.env.REACT_APP_BACKEND_URL + "/disease/byAllSymptoms";
  const allSymptomsUrl = process.env.REACT_APP_BACKEND_URL + "/symptom";
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryResults, setQueryResults] = useState([]);

  // React Tags
  const reactTags = useRef();
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Related Symptoms
  const [relatedSymptoms, setRelatedSymptoms] = useState([]);

  // Pagination
  const PER_PAGE = 4;

  // Fetch symptoms and get disease results
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    // Fetch possible symptoms
    fetch(allSymptomsUrl, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setSuggestions(result);
        return result;
      })
      .then(async (result) => {
        setTags(
          result.filter((suggestion, _) =>
            searchParams.getAll("query").includes(suggestion.name)
          )
        );
      });

    if (searchParams.getAll("query").length === 0) {
      setQueryResults([]);
      setRelatedSymptoms([]);
      return;
    }

    // Fetch disease results
    const params = new URLSearchParams({
      symptoms: JSON.stringify(searchParams.getAll("query")),
    }).toString();

    const diseasesUrl = searchParams.getAll("filter").includes("all")
      ? diseasesAllSymptomsUrl
      : diseasesSomeSymptomsUrl;

    fetch(diseasesUrl + "?" + params, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let results = data.results.bindings;
        addDiseaseGroup(results);
        setQueryResults(results);
      });

    // Fetch related symptoms
    fetch(allSymptomsUrl + "/related?" + params, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRelatedSymptoms(data);
      });
  }, [diseasesSomeSymptomsUrl, diseasesAllSymptomsUrl, allSymptomsUrl, searchParams]);

  async function handleSubmit() {
    if (tags.length === 0) {
      toast.warn("Please enter at least one symptom", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    var params = new URLSearchParams(tags.map((t) => ["query", t.name]));
    setSearchParams(params);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      if (reactTags.current.suggestions.state.options.length === 0) {
        event.preventDefault();
        toast.warn("No symptoms matching your input.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  const onDelete = (tagIndex) => {
    const newTags = tags.filter((_, index) => index !== tagIndex);
    const newParams = newTags.map((t) => ["query", t.name]);
    newParams.push(["filter", searchParams.get("filter") ? searchParams.get("filter") : "some"]);
    var params = new URLSearchParams(newParams);
    setSearchParams(params);
  };

  const onAddition = (newTag) => {
      if (tags.length >= 3) {
        toast.warn("Please enter at most 3 symptoms!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!tags.find((tag) => tag.id === newTag.id)) {
        const newTags = [...tags, newTag];
        const newParams = newTags.map((t) => ["query", t.name]);
        newParams.push(["filter", searchParams.get("filter") ? searchParams.get("filter") : "some"]);
        var params = new URLSearchParams(newParams);
        setSearchParams(params);
      }
  };

  // Symptoms
  async function addToQuery(event) {
    let symp = suggestions.find(
      (suggestion) => suggestion.name === event.target.innerText
    );
    onAddition(symp);
  }

  function setSearchFilter(filter) {
    const newParams = tags.map((t) => ["query", t.name]);
    newParams.push(["filter", filter]);
    newParams.push(["page", 1]);
    setSearchParams(new URLSearchParams(newParams));
  }

  function isAllFilterActive() {
    if (searchParams.get("filter") === "all") return true;
    return false;
  }

  // Pagination
  function handlePageChange({ selected: selectedPage }) {
    const newParams = tags.map((t) => ["query", t.name]);
    newParams.push(["page", selectedPage + 1]);
    newParams.push(["filter", searchParams.get("filter") ? searchParams.get("filter") : "some"]);
    setSearchParams(new URLSearchParams(newParams));
  }

  function getCurrentPage() {
    return searchParams.get("page") ? parseInt(searchParams.get("page") - 1) : 0;
  }
  
  /* Render */
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
        <Col className="p-0 flex items-center">
          <form
            className="grow"
            onKeyDown={handleKeyDown}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ReactTags
              ref={reactTags}
              tags={tags}
              suggestions={suggestions.filter(
                (_, i) => !tags.find((tag) => tag.id === _.id)
              )}
              handleDelete={onDelete}
              handleAddition={onAddition}
              placeholder="Search for symptoms"
              classNames={searchClassNames("md:w-[100%]")}
              minQueryLength={1}
            />
          </form>
        </Col>
      </Row>
      <Row className="mt-3 ">
        <nav className=" mr-0 flex flex-col sm:flex-row">
          <button
            onClick={() => setSearchFilter("some")}
            className={`text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none 
            ${!isAllFilterActive() ? "text-blue-500 border-b-2 font-medium border-blue-500" : ""}`}
          >
            At least one symptom
          </button>
          <button
            onClick={() => setSearchFilter("all")}
            className={`text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none
            ${isAllFilterActive() ? "text-blue-500 border-b-2 font-medium border-blue-500" : ""}`}
          >
            All symptoms
          </button>
        </nav>
      </Row>
      <Row className="pr-0 mr-0">
        <Col className="col-9 mb-7 pr-0 mr-0">
          {queryResults.length === 0 ? (
            <p className="mt-4 ml-4 text-m font-small text-slate-600">
              No results to show. Don't forget to input your symptoms.
            </p>
          ) : (
            queryResults.slice(
              getCurrentPage() * PER_PAGE, 
              getCurrentPage() * PER_PAGE + PER_PAGE).map((disease, index) => (
              <DiseaseCard
                key={disease.diseaseName.value + index}
                disease={disease}
              />
            ))
          )}
          <ReactPaginate
            initialPage={getCurrentPage()}
            forcePage={getCurrentPage()}
            previousLabel={"??? Previous"}
            nextLabel={"Next ???"}
            pageCount={Math.ceil(queryResults.length / PER_PAGE)}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />

        </Col>
        <Col className="p-0 col-3">
          <div
            className="mt-3 mx-0 relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6"
            href=""
          >
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 to-blue-500"></span>
            <div className="justify-between sm:flex">
              <h5 className="text-xl font-bold text-slate-900">
                Related Symptoms
              </h5>
            </div>
            <div>
              {relatedSymptoms.map((symp) => (
                <p
                  type="button"
                  title="Click to add symptom to the search"
                  className="p-2 hover:text-teal-600 text-gray-500 bg-gray-200 font-semibold text-sm align-center text-center cursor-pointer active:bg-gray-300"
                  onClick={addToQuery}
                  key={`related_${symp.relatedSymptom.value}`}
                >
                  {symp.relatedSymptom.value}
                </p>
              ))}
            </div>
          </div>

        </Col>
      </Row>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </Container>
  );
}

export default Results;
