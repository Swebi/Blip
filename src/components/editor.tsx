"use client";

import { editorPlaceholder } from "@/config/data";
import { supportedLanguages } from "@/config/languages";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";

export default function IDE() {
  const handleSubmit = async () => {};
  const [selectedLanguage, setSelectedLanguage] = useState<string>("html");
  const [fileName, setFileName] = useState<string>("index.html");
  const [selectedTab, setSelectedTab] = useState<string>("ide");

  useEffect(() => {
    console.log(selectedLanguage);
  }, [selectedLanguage]);
  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 min-w-[62vw] h-full justify-center items-center  ">
        <div className="flex flex-col w-full">
          <h1 className="text-white text-5xl mb-5">Title</h1>
          <p className="text-white text-base w-[60vw] mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laboriosam, quam cupiditate architecto molestiae pariatur nulla sint
            voluptates, tempora quibusdam modi asperiores perferendis sapiente
            nisi non provident rem impedit reiciendis sed?
          </p>
        </div>
        <div className=" flex self-start justify-between items-center w-full text-white rounded-lg  h-fit border border-white/10 p-2">
          <div className="flex gap-3">
            <h1
              className="text-sm bg-[#1E1E1E] p-3 px-4 rounded-lg outline-none "
              contentEditable
              onInput={(e) => {
                const element = e.target as HTMLElement;
                setFileName(element.innerText);
              }}
              onClick={() => setSelectedTab("ide")}
            >
              index.html
            </h1>
            <h1
              className="text-sm bg-[#1E1E1E] p-3 px-4 rounded-lg outline-none "
              onClick={() => setSelectedTab("logs")}
            >
              logs
            </h1>
          </div>
          <Select
            onValueChange={(value) => {
              setSelectedLanguage(value);
            }}
          >
            <SelectTrigger className="w-[180px] dark bg-primary">
              <SelectValue placeholder={selectedLanguage} />
            </SelectTrigger>
            <SelectContent className="dark bg-background">
              {supportedLanguages.map((language) => (
                <SelectItem
                  value={language.name}
                  key={language.id}
                  className="dark bg-background "
                >
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedTab == "ide" ? (
          <div className="bg-[#1E1E1E] rounded-lg w-[62vw] h-[75vh] border border-white/10 px-2 py-4">
            <Editor
              path="index.js"
              height="70vh"
              width="60vw"
              defaultLanguage="html"
              defaultValue={editorPlaceholder}
              language={selectedLanguage}
              theme="vs-dark"
            />
          </div>
        ) : (
          <div className="bg-[#1E1E1E] rounded-lg flex flex-col h-[75vh] w-[62vw] border border-white/10 ">
            <div className="w-full flex justify-start p-3 items-center gap-1.5 bg-[#282828] h-8 rounded-t-lg ">
              <div className="rounded-full h-3 w-3 bg-[#FF5F57]" />
              <div className="rounded-full h-3 w-3 bg-[#FEBC2E]" />
              <div className="rounded-full h-3 w-3 bg-[#27C43F]" />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
