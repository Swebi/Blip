import IDE from "@/components/Editor";
import Image from "next/image";
import React from "react";
import hero from "@/assets/hero.png";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center pt-0 pb-0  bg-[#]">
      {/* <h1 className="text-white text-7xl font-semibold">
        Share your code with ease
      </h1>
      <p className="text-white">
        Blip is a fast, secure & open-source platform built for developers.
        Effortlessly share, store and manage your code snippets to collaborate
        with ease
      </p>
      <div className="flex justify-center items-center bg-[#2B2C2D] border-[#131415] px-4 rounded-[20px] h-[470px] w-[700px]">
        <Image src={hero} height={0} width={0} alt="hero" className="w-fit" />
      </div> */}
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col gap-2 md:gap-5 ">
            <h1 className="text-white text-5xl md:text-7xl text-center font-semibold">
              Share your code with ease
            </h1>
            <p className="text-white md:w-[600px] font-extralight text-base md:text-xl leading-tight mx-auto text-center">
              Blip is a fast, secure & open-source platform built for
              developers. Effortlessly share, store and manage your code
              snippets to collaborate with ease
            </p>
          </div>
        }
      >
        <Image
          src={hero}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default Home;
