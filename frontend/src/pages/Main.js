//import Footer from "../components/footer.js";
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ReactTags from "react-tag-input-custom-search";

function Main() {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL + "/symptom";
  const reactTags = useRef()
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const searchClassNames = {
    root: "md:w-[584px] mx-auto mt-7 flex flex-wrap w-[92%] items-center border hover:shadow-md",
    rootFocused: 'is-focused',
    selected: 'react-tags__selected pl-2',
    selectedTag: "react-tags__selected-tag text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease",
    selectedTagName: 'react-tags__selected-tag-name',
    search: 'react-tags__search',
    searchWrapper: 'react-tags__search-wrapper',
    searchInput: "w-full bg-transparent py-[14px] pl-2 outline-none",
    suggestions: 'react-tags__suggestions',
    suggestionActive: 'is-active',
    suggestionDisabled: 'is-disabled',
    suggestionPrefix: 'react-tags__suggestion-prefix'
  }

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(backendUrl, requestOptions)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        setSuggestions(result);
      }
      )
  }, [backendUrl])

  async function handleClickAboutUs() {
    navigate("/aboutus");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let query = event.currentTarget.elements.query.value;
    let queryArray = query.split(",");
    var params = new URLSearchParams(queryArray.map((s) => ["query", s]));

    navigate({
      pathname: "/results",
      search: `?${params.toString()}`,
    });
  }

  const onDelete = useCallback((tagIndex) => {
    setTags(tags.filter((_, i) => i !== tagIndex))
  }, [tags])

  const onAddition = useCallback((newTag) => {
    setTags([...tags, newTag])
  }, [tags])


  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div>
        <img alt="" className="h-[150px]" src={require("../assets/logo.png")} />
      </div>

        <ReactTags
          ref={reactTags}
          tags={tags}
          suggestions={suggestions}
          handleDelete={onDelete}
          handleAddition={onAddition}
          placeholder="Search for symptoms"
          classNames={searchClassNames}
        />
      {/* <div className="md:w-[584px] mx-auto mt-7 flex w-[92%] items-center rounded-full border hover:shadow-md">
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
        <form
          className="w-full bg-transparent rounded-full pl-4 outline-none"
          onSubmit={handleSubmit}
        >
          <input
            id="query"
            type="text"
            className="w-full bg-transparent rounded-full py-[14px] pl-4 outline-none"
          />
          <input type="submit" hidden />
        </form>
      </div>  */}

      <div className="mt-3 flex space-x-12">
        <button onClick={handleClickAboutUs} className="bg-[#f8f9fa] px-2 py-1">
          About Us
        </button>
      </div>
    </div>
  );
}

export default Main;
