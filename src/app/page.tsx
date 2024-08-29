import Image from "next/image";
import React from "react";
import hero from "@/assets/hero.png";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import EncryptButton from "@/components/EncryptButton";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center pt-0 pb-0  bg-[#]">
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
        <div className="flex w-full justify-center pt-20">
          <Link href="dashboard">
            <EncryptButton />
          </Link>
        </div>
      </ContainerScroll>
    </div>
  );
};

export default Home;
