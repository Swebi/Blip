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
import { Button } from "./ui/button";

export default function IDE({}) {
  const [state, setState] = useState({
    code: "",
    logs: "",
    selectedLanguage: "html",
    fileName: "",
    selectedTab: "ide",
    title: "",
    description: "",
    editor: false,
  });

  const updateState = (key: string, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {};

  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-[90vw] sm:w-[62vw] h-full justify-center items-center">
        <div className="flex flex-col w-full">
          <Input
            className="text-white text-5xl mb-5 outline-none bg-transparent border-b border-t-0 border-x-0 py-10 px-0 rounded-none border-white/10 placeholder:text-white/10"
            placeholder="Title"
            value={state.title}
            onChange={(e) => updateState("title", e.target.value)}
          />
          <textarea
            contentEditable
            suppressContentEditableWarning={true}
            className="text-white text-base w-[90vw] sm:w-full h-fit resize-none mb-1 outline-none bg-transparent border-y-0 border-x-0 py-2 px-0 rounded-none border-white/10 placeholder:text-white/10"
            placeholder="Description"
            value={state.description}
            onChange={(e) => updateState("description", e.target.value)}
          />
        </div>
        <div className="flex self-start justify-between items-center w-full text-white rounded-lg h-fit border border-white/10 p-2">
          <div className="flex gap-3">
            <Input
              value={state.fileName}
              className="text-sm bg-[#1E1E1E] p-3 px-4 border-none rounded-lg outline-none"
              onChange={(e) => updateState("fileName", e.target.value)}
              onClick={() => updateState("selectedTab", "ide")}
              placeholder="file name"
            />
            <h1
              className="text-sm bg-[#1E1E1E] p-3 px-4 rounded-lg outline-none"
              onClick={() => updateState("selectedTab", "logs")}
            >
              logs
            </h1>
          </div>
          <Select
            disabled={state.selectedTab === "logs"}
            onValueChange={(value) => updateState("selectedLanguage", value)}
          >
            <SelectTrigger className="w-[100px] lg:w-[180px] dark bg-primary">
              <SelectValue placeholder={state.selectedLanguage} />
            </SelectTrigger>
            <SelectContent className="dark bg-background">
              {supportedLanguages.map((language) => (
                <SelectItem
                  value={language.name}
                  key={language.id}
                  className="dark bg-background"
                >
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {state.selectedTab === "ide" ? (
          <div className="bg-[#1E1E1E] rounded-lg w-[90vw] sm:w-[62vw] h-[90vh] border border-white/10 px-2 py-4">
            <Editor
              path={state.fileName}
              defaultLanguage="html"
              defaultValue={editorPlaceholder}
              language={state.selectedLanguage}
              theme="vs-dark"
              className="w-[60vw] h-[70vh]"
              options={{
                readOnly: false,
                minimap: {
                  enabled: false,
                },
              }}
              value={state.code}
              onChange={(value) => updateState("code", value || "")}
            />
          </div>
        ) : (
          <div className="bg-[#1E1E1E] rounded-lg flex flex-col h-[75vh] w-[90vw] sm:w-[62vw] border border-white/10">
            <div className="w-full flex justify-start p-3 items-center gap-1.5 bg-[#282828] h-8 rounded-t-lg">
              <div className="rounded-full h-3 w-3 bg-[#FF5F57]" />
              <div className="rounded-full h-3 w-3 bg-[#FEBC2E]" />
              <div className="rounded-full h-3 w-3 bg-[#27C43F]" />
            </div>
            <div className="w-full h-full p-3">
              <textarea
                className="w-full h-full bg-transparent text-white outline-none resize-none"
                placeholder="Type any logs/output here"
                value={state.logs}
                onChange={(e) => updateState("logs", e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center mt-10">
        <Button className="">Submit</Button>
      </div>
    </form>
  );
}
