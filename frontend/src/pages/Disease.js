import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function DiseasePage() {
    async function backToHomePage() {
        window.location.href = '/';
    }

    return (
        <Container fluid="md">
            <Row className="mt-5">
                <Col className="col-2">
                    <button>
                        <img onClick={backToHomePage} src={require("../assets/logo.png")} />
                    </button>
                </Col>

            </Row>
            <Row className="px-3 mr-0">
                <div
                    className="mx-0 mt-3 px-3 relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6"
                // href=""
                >
                    <span
                        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 to-blue-500"
                    ></span>

                    <div className="justify-between sm:flex mr-5">
                        <Col className="col-9">
                            <div>
                                <h5 className="text-xl font-bold text-slate-900">
                                    Disease Name
                                </h5>
                                
                            </div>
                        

                            <div className="mt-1 sm:pr-8">
                                <p className="text-sm text-slate-500">
                                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>

                            <dl className="flex mt-3">
                                <div className="flex flex-col">
                                    <dt className="text-sm font-medium text-slate-600">Also known as:</dt>
                                    <dd className="text-xs text-slate-500">Lista de sinonimos, Lista de sinonimos,Lista de sinonimos,Lista de sinonimos,Lista de sinonimos</dd>
                                </div>
                            </dl>
                            
                            <dl className="flex mt-3">
                                <div className="flex flex-col">
                                    <dt className="text-sm font-medium text-slate-600">Disease Group</dt>
                                    <dd className="text-xs text-slate-500">Disease Group</dd>
                                </div>
                            </dl>
                            
                            <dl className="flex mt-3">
                                <div className="flex flex-col">
                                    <dt className="text-sm font-medium text-slate-600">Part of the body</dt>
                                    <dd className="text-xs text-slate-500">Part of the body</dd>
                                </div>
                            </dl>

                            <dl className="flex mt-3">
                                <div className="flex flex-col">
                                    <dt className="text-sm font-medium text-slate-600 mb-1">See also</dt>
                                    <div className="flex flex-row">
                                        <button class="border border-teal-500 text-sm text-slate-600 block rounded-sm mr-3 p-1 flex items-center hover:bg-teal-500 hover:text-white">
                                            Disease 1 Bla Bla 
                                        </button>
                                        <button class="border border-teal-500 text-sm text-slate-600 block rounded-sm mr-3 p-1 flex items-center hover:bg-teal-500 hover:text-white">
                                            Disease 1 Bla Bla 
                                        </button>
                                        <button class="border border-teal-500 text-sm text-slate-600 block rounded-sm mr-3 p-1 flex items-center hover:bg-teal-500 hover:text-white">
                                            Disease 1 Bla Bla 
                                        </button>
                                        <button class="border border-teal-500 text-sm text-slate-600 block rounded-sm mr-3 p-1 flex items-center hover:bg-teal-500 hover:text-white">
                                            Disease 1 Bla Bla 
                                        </button>
                                    </div>
                                </div>
                            </dl>



                        </Col>
                        <Col className="col-3">
                            <div className="flex-shrink-0 hidden ml-3 sm:block">
                                <h6 className="text font-bold text-slate-900">
                                    Symptoms
                                </h6>
                                <p className="mt-1 text-xs font-medium text-slate-600">Symptom 1</p>
                                <p className="mt-1 text-xs font-medium text-slate-600">Symptom 2</p>
                            </div>
                        </Col>

                    </div>

                </div>


            </Row>
        </Container>
    );
}

export default DiseasePage;
