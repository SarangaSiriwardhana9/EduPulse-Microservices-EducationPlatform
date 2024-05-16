// Feature2.js
import React from "react";
import FeatureCard from "./FeatureCard";
import { BiTime, BiUser, BiCamera } from "react-icons/bi";

function Feature2() {
  return (
    <div className="featureDiv2 flex justify-around items-center py-4 border-t border-b border-gray-300">
      <FeatureCard
        icon={<BiTime className="w-10 h-10" />}
        heading="Go at your own pace"
        para="Enjoy lifetime access to courses on Udemy’s website and app"
      />
      <FeatureCard
        icon={<BiUser className="w-10 h-10" />}
        heading="Learn from industry experts"
        para="Select from top instructors around the world"
      />
      <FeatureCard
        icon={<BiCamera className="w-10 h-10" />}
        heading="Find video courses on almost any topic"
        para="Build your library for your career and personal growth"
      />
    </div>
  );
}

export default Feature2;
