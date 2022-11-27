//import Footer from "../components/footer.js";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactTags from "react-tag-input-custom-search";
import searchClassNames from "../utils/searchClasses";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  async function handleSubmit() {
    if (tags.length === 0) {
      toast.warn('Please enter at least one symptom', {
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
    navigate({
      pathname: "/results",
      search: `?${params.toString()}`,
    });
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      if(reactTags.current.suggestions.state.options.length === 0) {
        event.preventDefault();
        toast.warn('No symptoms matching your input.', {
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

  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );

  const onAddition = useCallback(
    (newTag) => {
      if (tags.length >= 3) {
        toast.warn('Please enter at most 3 symptoms!', {
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
        setTags([...tags, newTag]);
      }
    },
    [tags]
  );

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div>
        <img alt="" className="h-[150px]" src={require("../assets/logo.png")} />
      </div>

      <form
        onKeyDown={handleKeyDown}
        onSubmit={(e) => {e.preventDefault(); handleSubmit();}}
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
          minQueryLength={1}
        />
      </form>

      <div className="mt-5 flex space-x-12">
        <button onClick={handleClickAboutUs} className="bg-gray px-4 py-2">
          About Us
        </button>
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Main;
