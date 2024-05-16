import React from "react";

function FillerDiv() {
  return (
    <div className="fillerDiv relative flex justify-center items-center bg-blue-300 bg-repeat-x bg-purple-intersect bg-cover">
      <div className="aboutFiller py-6 text-white flex flex-col items-center justify-center w-3/10 h-3/5">
        <h2 className="text-4xl mb-3">Get personal learning recommendations</h2>
        <p className="text-lg mb-5">Answer a few questions for your top picks</p>
        <div className="getstartedButton border border-white rounded-md font-semibold px-6 py-3 cursor-pointer">
          Get Started
        </div>
      </div>
    </div>
  );
}

export default FillerDiv;
