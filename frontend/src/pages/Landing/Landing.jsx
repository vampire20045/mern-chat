import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
    <div className="font-sans mt-[1300px]">


      <section className="bg-cover h-screen flex items-center justify-center" style={{backgroundImage: "url('https://wallpaper.dog/large/10724012.jpg')"}}>
        <div className="bg-black bg-opacity-50 p-8 text-white text-center">
          <h2 className="text-5xl font-semibold mb-4">GIVE A HAND TO MAKE</h2>
          <h2 className="text-5xl font-semibold">BECOME BETTER CODER </h2>
          <div className="mt-8">
            <button className="bg-white text-black px-6 py-2 rounded-full mr-4">CONNECT</button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full">Read more</button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">CHOOSE YOUR OPTION</h2> {/* Fixed typo */}
          <div className="flex justify-center">
            {/* Team Members */}
            <div className="team-member bg-gray-100 w-72 mx-4 p-8 text-center"> {/* Increased size of the div */}
              <div className="team-img mx-auto w-40 h-40 bg-gray-200 rounded-full"></div> {/* Increased size of the team-img */}
              <h3 className="text-xl font-semibold mt-4">ANDROID</h3>
              <p className="text-gray-500">KOTLIN</p>
              <p className="text-gray-500">JAVA</p>
            </div>
            <div className="team-member bg-gray-100 w-72 mx-4 p-8 text-center"> {/* Increased size of the div */}
              <div className="team-img mx-auto w-40 h-40 bg-gray-200 rounded-full"></div> {/* Increased size of the team-img */}
              <h3 className="text-xl font-semibold mt-4">WEB DEVEP</h3>
              <p className="text-gray-500">JAVASCRIPT</p>
              <p className="text-gray-500">REACT</p>
            </div>
            <div className="team-member bg-gray-100 w-72 mx-4 p-8 text-center"> {/* Increased size of the div */}
              <div className="team-img mx-auto w-40 h-40 bg-gray-200 rounded-full"></div> {/* Increased size of the team-img */}
              <h3 className="text-xl font-semibold mt-4">LANGUAGE</h3>
              <p className="text-gray-500">PYTHON</p>
              <p className="text-gray-500">C++</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="container mx-auto py-16">
        <iframe title="Google Map" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=lovely professional university &amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" width="100%" height="300" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
      </section>
    </div>
    </div>
  );
}

export default Landing;
