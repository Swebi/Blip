import IDE from "@/components/editor";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-5 pb-10  bg-[#131415]">
      <IDE />
    </div>
  );
};

export default Home;
