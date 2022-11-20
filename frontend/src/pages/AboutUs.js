import React, { useEffect, useState } from "react";

function AboutUs() {

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
                        <p className="text-gray-600 lg:w-8/12 lg:mx-auto">Textinho sobre o projeto TODO: Tailus prides itself not only on award-winning technology, but also on the talent of its people of some of the brightest minds and most experienced executives in business.</p>
                    </div>
                    <div className="grid gap-12 items-center md:grid-cols-4">
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src="https://tailus.io/sources/blocks/classic/preview/images/woman1.jpg" alt="woman" loading="lazy" width="640" height="805" />
                            <div>
                                <h4 className="text-2xl">Hentoni Doe</h4>
                                <span className="block text-sm text-gray-500">CEO-Founder</span>
                            </div>
                        </div>
                     
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src="https://tailus.io/sources/blocks/classic/preview/images/woman.jpg" alt="woman" loading="lazy" width="1000" height="667" />
                            <div>
                                <h4 className="text-2xl">Anabelle Doe</h4>
                                <span className="block text-sm text-gray-500">Chief Operations Officer</span>
                            </div>
                        </div>

                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src="https://tailus.io/sources/blocks/classic/preview/images/woman.jpg" alt="woman" loading="lazy" width="1000" height="667" />
                            <div>
                                <h4 className="text-2xl">Anabelle Doe</h4>
                                <span className="block text-sm text-gray-500">Chief Operations Officer</span>
                            </div>
                        </div>
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src="https://tailus.io/sources/blocks/classic/preview/images/woman.jpg" alt="woman" loading="lazy" width="1000" height="667" />
                            <div>
                                <h4 className="text-2xl">Anabelle Doe</h4>
                                <span className="block text-sm text-gray-500">Chief Operations Officer</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    );
}

export default AboutUs;
