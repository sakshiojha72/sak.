import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";
import SlidingCardsSection from "./SlidingCardsSection";

function App() {
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      // Only animate, do not toggle canvases
      gsap.set(growingSpan.current, {
        top: e.clientY,
        left: e.clientX,
      });

      gsap.to("body", {
        color: "#000",
        backgroundColor: "#fd2c2a",
        duration: 1.2,
        ease: "power2.inOut",
      });

      gsap.to(growingSpan.current, {
        scale: 1000,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(growingSpan.current, {
            scale: 0,
            clearProps: "all",
          });
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        },
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {data[0].map((canvasdets, index) => (
          <Canvas details={canvasdets} key={index} />
        ))}
        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-3xl font-md">sak.</div>
            <div className="links flex gap-10 text-2xl font-light">
              {[

                "  ",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer  w-full px-[20%]">
            <div className="text w-[60%]">
              <h3 className="text-5xl leading-[1.2] mt-10 ">
              hi, sakshi this side!
              </h3>
              <p className="text-xl w-[99%] mt-10 font-light leading-[1.5] bottom-20">
              An MCA student with a track record of academic excellence (CGPA 9.39) and a flair for front-end development, 
        blending precision with creativity. Known for perfectionism and an eye for detail, every project is
         crafted to be clean, responsive, and engaging. Skilled in HTML, CSS, JavaScript, React, and Three.js.
          Always eager to learn, bringing both curiosity and discipline
           to the table—where design meets functionality, and learning never stops. 
              </p>
            </div>
          </div>
          <div className="w-full absolute  bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-[9rem] font-normal tracking-tight leading-none pl-5 "
            >
              Code. Coffee. Curiosity
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen  mt-32 px-10 font-['Helvetica_Now_Display']">
        {data[1].map((canvasdets, index) => (
          <Canvas details={canvasdets} key={index} />
        ))}
        
        <p className="text-3xl leading-[1.1] w-[80%] mt-10 font-normal">

        </p>

        <div className="flex items-start gap-8 mt-10">
          {data[3].map((canvasdets, index) => (
            <Canvas details={canvasdets} key={index} />
          ))}
          <img
            mt-200
            className="w-[30%]"
            src="./src/me.png"
            alt=""
          />

          
          <SlidingCardsSection />
        </div>

      </div>
    </>
  );
}

export default App;
