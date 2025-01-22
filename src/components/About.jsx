import React from "react";

const About = () => {
  return (
    <div className=" text-white min-h-screen flex items-center p-6 ml-32 mr-80 font-medium font-robota">
      <div className="text-left">
        <h1 className="text-[2.5rem] mb-2">
          Hey, Najman here!{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </h1>
        <p className="text-[2.5rem] leading-snug">
          I'm a passionate web developer and designer, specializing in creating
          responsive, visually appealing websites. I’m dedicated to bringing
          innovative web solutions to life, helping businesses stand out and
          thrive in the digital world with unique, user-focused designs.
        </p>
      </div>
    </div>
  );
};

export default About;
