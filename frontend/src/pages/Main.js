import Footer from "../components/footer.js";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  async function handleClickAboutUs() {
    navigate('/aboutus');
  }

  async function handleClickProject() {
    navigate('/aboutproject');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let query = event.currentTarget.elements.query.value;
    let queryArray = query.split(",");
    var params = new URLSearchParams(queryArray.map(s =>['query',s]))

    navigate({
      pathname: "/results",
      search: `?${params.toString()}`,
    });
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div>
        <img
          className="h-[150px]"
          src={require('../assets/logo.png')} 
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
        <form className="w-full bg-transparent rounded-full pl-4 outline-none" onSubmit={handleSubmit}>
          <input
            id="query"
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
        <button onClick={handleClickAboutUs} className="bg-[#f8f9fa] px-2 py-1">
          About Us
        </button>
        <button onClick={handleClickProject} className="bg-[#f8f9fa] px-2 py-1">
          Project Details
        </button>
       
      </div>
      
    </div>
    
  );
}

export default Main;
