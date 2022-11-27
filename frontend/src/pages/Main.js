//import Footer from "../components/footer.js";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactTags from "react-tag-input-custom-search";
import searchClassNames from "../utils/searchClasses";

function Main() {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL + "/symptom";
  const reactTags = useRef();
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(backendUrl, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setSuggestions(result);
      });
  }, [backendUrl]);

  async function handleClickAboutUs() {
    navigate("/aboutus");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if(tags.length === 0) {
      
    }

    var params = new URLSearchParams(tags.map((t) => ["query", t.name]));
    navigate({
      pathname: "/results",
      search: `?${params.toString()}`,
    });
  }

  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );

  const onAddition = useCallback(
    (newTag) => {
      if (!tags.find((tag) => tag.id === newTag.id)) setTags([...tags, newTag]);
    },
    [tags]
  );

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div>
        <img alt="" className="h-[150px]" src={require("../assets/logo.png")} />
      </div>

      <form
        onSubmit={handleSubmit}
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
          classNames={searchClassNames}
        />
      </form>


      <div className="mt-5 flex space-x-12">
        <button onClick={handleClickAboutUs} className="bg-gray px-4 py-2">
          About Us
        </button>
      </div>
    </div>
  );
}

export default Main;
