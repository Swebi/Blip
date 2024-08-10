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

  useEffect(() => {
    console.log(selectedLanguage);
  }, [selectedLanguage]);
  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 w-full h-full justify-center items-center  ">
        <div className="flex flex-col w-full">
          <h1 className="text-white text-5xl mb-5">Title</h1>
        </div>
        <div className=" flex self-start justify-between items-center w-full text-white rounded-lg  h-fit border border-white/10 p-2">
          <h1
            className="text-sm bg-[#1E1E1E] p-3 px-4 rounded-lg outline-none "
            contentEditable
            onInput={(e) => {
              const element = e.target as HTMLElement;
              setFileName(element.innerText);
            }}
          >
            index.html
          </h1>
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
        <div className="bg-[#1E1E1E] rounded-lg w-fit h-fit border border-white/10 px-4 py-6">
          <Editor
            path="index.js"
            height="70vh"
            width="50vw"
            defaultLanguage="html"
            className="rounded-2xl w-[70vw]"
            defaultValue={editorPlaceholder}
            language={selectedLanguage}
            theme="vs-dark"
          />
        </div>
      </div>
    </form>
  );
}
