import IDE from "@/components/Editor";
import { editorPlaceholder } from "@/config/data";
import { codeState } from "@/lib/schema";
import React from "react";

const Create = () => {
  const propState: codeState = {
    code: editorPlaceholder,
    logs: "",
    selectedLanguage: "html",
    fileName: "",
    selectedTab: true,
    title: "",
    description: "",
    viewer: false,
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-5 pb-10  bg-[#131415]">
      <IDE propState={propState} />
    </div>
  );
};

export default Create;
