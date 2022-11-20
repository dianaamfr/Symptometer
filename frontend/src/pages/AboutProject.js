import React, { useEffect, useState } from "react";

function AboutProject() {
    async function backToHomePage() {
        window.location.href = '/';
    }
    return (
        
            <div class=" flex h-screen flex-col items-center justify-center bg-white py-20 ">
      <div>
        <img
        onClick={backToHomePage}
          className="h-[150px]"
          src={require('../assets/logo.png')} 
        />
      </div>
                <div className="container mx-auto px-6 md:px-12 xl:px-32">
                    <div className="mb-16 text-center">
                        <p className="text-gray-600 lg:w-8/12 lg:mx-auto">Textinho sobre o projeto TODO: Detalhes ontologia etc</p>
                    </div>
                   
                        
                </div>
            </div>
    );
}

export default AboutProject;
