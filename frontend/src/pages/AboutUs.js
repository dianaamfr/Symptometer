import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { createSearchParams, useNavigate } from "react-router-dom";


function AboutUs() {

    const navigate = useNavigate();


    async function backToHomePage() {
    navigate('/');
  }


    return (
        <Row>
            <Col className="col-1"></Col>
            <Col className="col-10">
                <Row >
                    <div class="mt-5 mb-3 px-4">
                        <img onClick={backToHomePage} class="w-[40%]" src={require("../assets/logo.png")} />
                        <p class="mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl">Free access to reliable and aggregated medical information. Allows the user to search for the possible causes of their symptoms, identifying the respective possible diseases.</p>
                       

                        <button onClick={backToHomePage} class=" group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
    <div class="absolute inset-0 w-3 bg-blue-200 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span class="relative text-black group-hover:text-white">Start searching</span>
  </button>

                    </div>
                </Row>

                <section class="bg-white px-4">
                    <div class="gap-16 items-center py-8 mx-0 max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16">
                        <div class="font-light text-gray-700 sm:text-lg">
                            <h2 class="mb-4 text-4xl text-gray-600">Why?</h2>
                            <p class="mb-2 text-gray-800">Nowadays, it is very common for people to search for their symptoms online. However, the information may not be reliable and could be spread across multiple sources. With this in mind, we believe providing a platform where the user can get his “diagnosis” from several trustworthy sources is crucial. This diagnosis is always subjective to professional opinion, and it is always advisable to consult a doctor.
                            </p>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-8 m-0">
                            <img class="w-full rounded-lg" src="https://i.pinimg.com/736x/10/1a/ee/101aee513f2799de5cd6e3ed9a91416a.jpg" alt="office content 1" />
                            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://previews.123rf.com/images/ammentorp/ammentorp1708/ammentorp170800032/83771966-medical-team-discussing-work-while-walking-along-the-hospital-corridor-vertical-image-of-medics-brie.jpg" alt="office content 2" />
                        </div>
                    </div>
                </section>

                <section class="bg-white-50 ">
                    <div class="py-6 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                        <div class="max-w-screen-md mb-8 lg:mb-16">
                            <h2 class="mb-4 text-4xl text-gray-600">How?</h2>
                        </div>
                        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                            <div>
                                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                                    <svg class="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                </div>
                                <h3 class="mb-2 text-xl font-bold ">Allow symptom search
                                </h3>
                                <p class="text-gray-700 ">Symptometer allows the user to search for the possible causes of their symptoms, identifying the respective possible diseases. To do that the users simply have to use the search bar and input their symptoms.</p>
                            </div>
                            <div>
                                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                                    <svg class="w-5 h-5 text-blue-600 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                                </div>
                                <h3 class="mb-2 text-xl font-bold ">Scientific strictness for trustworthy disease prediction</h3>
                                <p class="text-gray-700 ">The Human Disease Ontology integrates non-disease ontology terms to define connections between diseases, defined by logical axioms. It is coordinated by the University of Maryland School of Medicine, Institute for Genome Sciences.</p>
                            </div>
                            <div>
                                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                                    <svg class="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                </div>
                                <h3 class="mb-2 text-xl font-bold ">Comply with Web Semantic Linked Open Data Principles
                                </h3>
                                <p class="text-gray-700 ">IDK WHAT TO WRITE</p>
                            </div>

                            <div>
                                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                                    <svg class="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                </div>
                                <h3 class="mb-2 text-xl font-bold ">Intuitive interface </h3>
                                <p class="text-gray-700 ">The Symptometers' interface allows users to interact with the system quickly and easily by using a simple and clean design.</p>
                            </div>

                            <div>
                                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                                    <svg class="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                </div>
                                <h3 class="mb-2 text-xl font-bold ">Provide detailed information</h3>
                                <p class="text-gray-700 ">IDK WHAT TO WRITE</p>
                            </div>

                            <div>
                                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                                    <svg class="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                </div>
                                <h3 class="mb-2 text-xl font-bold ">Retrieve results quickly</h3>
                                <p class="text-gray-700 ">IDK WHAT TO WRITE Something about efficient queries</p>
                            </div>
                        </div>
                    </div>
                </section>


                <div class="bg-white-50 row">
                    <div class="pt-8 px-4 mx-auto">
                            <h2 class="mb-4 text-4xl text-gray-600">Who?</h2>
                            <p class="mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl">This project was developed within the scope of the course Semantic Web and Linked Data in the University of Porto, Portugal. With the supervision of the Professor Liliana da Silva Ferreira.</p>
              
                        </div>
                    <div className="grid px-4 pb-5 gap-12 items-center md:grid-cols-4">
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                 src={require("../assets/20221120_160632.jpg")} alt="woman" loading="lazy" width="640" height="805" />
                            <div>
                                <h4 className="text-2xl">Diana Freitas</h4>
                                <span className="block text-sm text-gray-700">Linkedin</span>
                            </div>
                        </div>

                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src="https://tailus.io/sources/blocks/classic/preview/images/woman.jpg" alt="woman" loading="lazy" width="1000" height="667" />
                            <div>
                                <h4 className="text-2xl">Gustavo Mendes</h4>
                                <span className="block text-sm text-gray-700">Linkedin</span>
                            </div>
                        </div>

                        
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src={require("../assets/photo_MarianaRamos.jpeg")} alt="woman" loading="lazy" width="640" height="805" />
                            <div>
                                <h4 className="text-2xl">Mariana Ramos</h4>
                                <a href="https://www.linkedin.com/in/mariana-ramos-554874216/" className="block text-sm text-gray-700">Linkedin</a>
                            </div>
                        </div>

                        
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src={require("../assets/IMG_4594.JPEG")} alt="woman" loading="lazy" width="640" height="805" />
                                <div>
                                <h4 className="text-2xl">Pedro Queirós</h4>
                                <span className="block text-sm text-gray-700">Queirós vais ter de criar Linkedin</span>
                            </div>
                        </div>

                       
                    </div>
                </div>

              

            </Col>
            <Col className="col-md-1"></Col>
            <footer class="p-4 bg-gray-50 sm:p-6">
                    <div>
                      
                        <div class="pr-5 sm:flex sm:items-center sm:justify-between">
                            <span class="text-sm text-gray-700 sm:text-center dark:text-gray-400">© 2022. All Rights Reserved.
                            </span>
                            
                        </div>
                    </div>
                </footer>
            <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>

        </Row>
    );
}

export default AboutUs;