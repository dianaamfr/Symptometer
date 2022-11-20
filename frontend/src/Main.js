import React, { useEffect, useState } from "react";

function Main() {
  const backendUrl = "http://localhost:8000";
  //const navigate = useNavigate();
  const [data, setData] = useState(null);

  async function handleClick() {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(backendUrl, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.results);
        setData(data);
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let search = event.currentTarget.elements.search.value;
    console.log(search);
    // const requestOptions = {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    // fetch(backendUrl, requestOptions)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data.results);
    //     setData(data);
    //   });
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div>
        <img
          className="h-[89px] w-[273px]"
          src="https://ppc.co/wp-content/uploads/2021/01/Google.png"
          alt="google Logo"
        />
      </div>

      <div className="md:w-[584px] mx-auto mt-7 flex w-[92%] items-center rounded-full border hover:shadow-md">
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
        <form onSubmit={handleSubmit}>
          <input
            id="search"
            type="text"
            className="w-full bg-transparent rounded-full py-[14px] pl-4 outline-none"
          />
          <input type="submit" hidden />
        </form>
        <div className="pr-5">
          {/* <svg
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
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg> */}
        </div>
      </div>

      <div className="mt-3 flex space-x-12">
        <button onClick={handleClick} className="bg-[#f8f9fa] px-2 py-1">
          Google Search
        </button>
        <div className="bg-[#f8f9fa] px-2 py-1">I'm Feeling Lucky</div>
      </div>

      {data != null && <div>Olá</div>}
    </div>
  );
}

export default Main;
