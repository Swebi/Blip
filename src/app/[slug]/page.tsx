import IDE from "@/components/editor";
import { editorPlaceholder } from "@/config/data";
import { codeState } from "@/lib/schema";
import React from "react";

const Slug = () => {
  const propState: codeState = {
    code: editorPlaceholder,
    logs: "logs",
    selectedLanguage: "html",
    fileName: "logs",
    selectedTab: true,
    title: "logs",
    description: "logs",
    viewer: true,
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-5 pb-10  bg-[#131415]">
      <IDE propState={propState} />
    </div>
  );
};

export default Slug;
