import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  async function backToHomePage() {
    navigate("/");
  }

  return (
    <Row>
      <Col className="col-1"></Col>
      <Col className="col-10">
        <Row>
          <div className="mt-5 mb-3 px-4">
            <a href="/">
              <img
                alt="back home" 
                className="w-[40%]"
                src={require("../assets/logo.png")}
              />
            </a>
            <p className="mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl">
              Free access to reliable and aggregated medical information. Allows
              the user to search for the possible causes of their symptoms,
              identifying the respective possible diseases.
            </p>

            <button
              onClick={backToHomePage}
              className=" group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
            >
              <div className="absolute inset-0 w-3 bg-project-theme-70 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-white">
                Start searching
              </span>
            </button>
          </div>
        </Row>

        <section className="bg-white px-4">
          <div className="gap-16 items-center py-8 mx-0 max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16">
            <div className="font-light text-gray-700 sm:text-lg">
              <h2 className="mb-4 text-4xl text-gray-600">Why?</h2>
              <p className="mb-2 text-gray-800">
                Nowadays, it is very common for people to search for their
                symptoms online. However, the information may not be reliable
                and could be spread across multiple sources. With this in mind,
                we believe providing a platform where the user can get his
                “diagnosis” from several trustworthy sources is crucial. This
                diagnosis is always subjective to professional opinion, and it
                is always advisable to consult a doctor.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 m-0">
              <img
                className="w-full rounded-lg"
                src="https://i.pinimg.com/736x/10/1a/ee/101aee513f2799de5cd6e3ed9a91416a.jpg"
                alt="office content 1"
              />
              <img
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src="https://previews.123rf.com/images/ammentorp/ammentorp1708/ammentorp170800032/83771966-medical-team-discussing-work-while-walking-along-the-hospital-corridor-vertical-image-of-medics-brie.jpg"
                alt="office content 2"
              />
            </div>
          </div>
        </section>

        <section className="bg-white-50 ">
          <div className="py-6 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl text-gray-600">How?</h2>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-project-theme-20 lg:h-12 lg:w-12 ">
                  <svg
                    className="w-5 h-5 text-project-theme lg:w-6 lg:h-6 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold ">Allow symptom search</h3>
                <p className="text-gray-700 ">
                  Symptometer allows the users to search for the possible causes
                  of their symptoms, identifying the respective possible
                  diseases. To do that, the users simply have to use the search
                  bar and input their symptoms.
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-project-theme-20 lg:h-12 lg:w-12 ">
                  <svg
                    className="w-5 h-5 text-project-theme lg:w-6 lg:h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold ">
                  Scientific strictness for trustworthy disease prediction
                </h3>
                <p className="text-gray-700 ">
                  The Human Disease Ontology integrates non-disease ontology
                  terms to define connections between diseases, defined by
                  logical axioms. It is coordinated by the University of
                  Maryland School of Medicine, Institute for Genome Sciences.
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-project-theme-20 lg:h-12 lg:w-12 ">
                  <svg
                    className="w-5 h-5 text-project-theme lg:w-6 lg:h-6 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold ">
                  Comply with Web Semantic Linked Open Data Principles
                </h3>
                <p className="text-gray-700 ">This solution gets a 5 stars rating according to the Linked Open Data principles. The data is available online in a non-proprietary format and uses W3C standards (RDF and SPAQRL) to identify information. Symptometer also interlinks internal and external information to provide context.</p>
              </div>

              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-project-theme-20 lg:h-12 lg:w-12 ">
                  <svg
                    className="w-5 h-5 text-project-theme lg:w-6 lg:h-6 "
                    fill="currentColor"
                    viewBox="0 0 640 520"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                    fillRule="evenodd"
                    d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H544c53 0 96-43 96-96V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H544c17.7 0 32 14.3 32 32V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zm159.8 80c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM96 309.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4H149.3C119.9 256 96 279.9 96 309.3zM461.2 336h56.1c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3H421.3c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6zM372 289c-3.9-.7-7.9-1-12-1H280c-4.1 0-8.1 .3-12 1c-26 4.4-47.3 22.7-55.9 47c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24H408c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-8.6-24.3-29.9-42.6-55.9-47zM512 176c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM320 256c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64z"                      
                    clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold ">Intuitive interface </h3>
                <p className="text-gray-700 ">
                  Symptometer's interface allows users to interact with the
                  system quickly and easily by using a simple and clean design.
                </p>
              </div>

              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-project-theme-20 lg:h-12 lg:w-12 ">
                  <svg
                    className="w-5 h-5 text-project-theme lg:w-6 lg:h-6 "
                    fill="currentColor"
                    viewBox="0 0 384 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                    fillRule="evenodd"
                    d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                    clipRule="evenodd"
                    />
                    
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold ">
                  Provide detailed information
                </h3>
                <p className="text-gray-700 ">Symptometer allows the user to get detailed information about the diseases that include the symptoms searched, such as a detailed description of the disease, the symptoms, other names for the same disease and the parts of the body it affects. </p>
              </div>

              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-project-theme-20 lg:h-12 lg:w-12 ">
                  <svg
                    className="w-5 h-5 text-project-theme lg:w-6 lg:h-6 "
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >

                    <path 
                    fillRule="evenodd"
                    d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"
                    clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold ">
                  Retrieve results quickly
                </h3>
                <p className="text-gray-700 ">
                Hundreds of results can be seamlessly and instantly retrieved through Symptometer's optimized queries.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white-50 row">
          <div className="pt-8 px-4 mx-auto">
            <h2 className="mb-4 text-4xl text-gray-600">Who?</h2>
            <p className="mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl">
              This project was developed within the scope of the course Semantic
              Web and Linked Data in the University of Porto, Portugal. With the
              supervision of the Professor Liliana da Silva Ferreira.
            </p>
          </div>
          <div className="grid px-4 pb-5 gap-12 items-center md:grid-cols-4">
            <div className="space-y-4 text-center">
              <img
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                src={require("../assets/diana_freitas.jpg")}
                alt="woman"
              />
              <div>
                <h4 className="text-2xl">Diana Freitas</h4>
                <a 
                 href="https://www.linkedin.com/in/dianaamfreitas/"
                 className="block text-sm text-gray-700">Linkedin
                 </a>
              </div>
            </div>

            <div className="space-y-4 text-center">
            <img
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                src={require("../assets/gustavo_sena.jpeg")}
                alt="woman"
              />
              <div>
                <h4 className="text-2xl">Gustavo Mendes</h4>
                <a 
                href="https://www.linkedin.com/in/gustavosenamendes/"
                className="block text-sm text-gray-700">
                  Linkedin
                  </a>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <img
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                src={require("../assets/photo_MarianaRamos.jpeg")}
                alt="woman"
              />
              <div>
                <h4 className="text-2xl">Mariana Ramos</h4>
                <a
                  href="https://www.linkedin.com/in/mariana-ramos-554874216/"
                  className="block text-sm text-gray-700"
                >
                  Linkedin
                </a>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <img
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                src={require("../assets/IMG_4594.JPEG")}
                alt="woman"
              />
              <div>
                <h4 className="text-2xl">Pedro Queirós</h4>
                <a 
                href="https://www.linkedin.com/in/pedro-queir%C3%B3s-4a14a825a/"
                className="block text-sm text-gray-700">
                  Linkedin
                  </a>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col className="col-md-1"></Col>
      <footer className="p-4 bg-gray-50 sm:p-6">
        <div>
          <div className="pr-5 sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-700 sm:text-center dark:text-gray-400">
              © 2022. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
      <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
    </Row>
  );
}

export default AboutUs;
