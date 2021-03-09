import React from "react";
import img from "../../img/img.png";
import email from "../../img/email.png";
import home from "../../img/home.png";
import contact from "../../img/contact.png";
import twitter from "../../img/twitter.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="mx-auto">
      <div className="flex flex-col p-2 border-2 border-blue-300 rounded-lg shadow-2xl lg:flex-row">
        <div className="flex items-center justify-center">
          <img src={img} className="w-40 px-6 bg-white border-4 rounded-full" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col items-center justify-end">
            <h1 className="pt-1 text-3xl font-semibold text-gray-200">
              Jeoffrey Rico
            </h1>
            <h2 className="py-1 font-serif text-lg font-semibold text-gray-200">
              jeoffreyrico@yahoo.com
            </h2>
          </div>
          <div className="flex flex-col w-full lg:flex-row">
            <div className="flex flex-col justify-around text-gray-200">
              <div className="flex flex-row items-center">
                <img src={email} className="m-2 rounded-lg" />
                <p className="font-serif text-xs">
                  www.linkedin. com/in/jeoff-rico-282181207
                </p>
              </div>
              <div className="flex flex-row items-center">
                <img src={home} className="m-2 rounded-lg" />
                <p className="font-serif text-xs">Ragas Sta Ana Pateros M.M.</p>
              </div>
            </div>
            <div className="flex flex-col justify-around text-gray-200">
              <div className="flex flex-row items-center">
                <img src={contact} className="m-2 rounded-lg" />
                <p className="text-xs">09381804047</p>
              </div>
              <div className="flex flex-row items-center">
                <img src={twitter} className="m-2 rounded-lg" />
                <p className="font-serif text-xs">@iemjeoff</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
