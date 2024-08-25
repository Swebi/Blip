"use client";

import { editorPlaceholder } from "@/config/data";
import { supportedLanguages } from "@/config/languages";
import Editor from "@monaco-editor/react";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { generateSlug } from "@/lib/slug";
import { createSnippet } from "@/actions/actions";
import Terminal from "./Terminal";
import LanguageSelect from "./LanguageSelect";
import { codeState } from "@/lib/schema";
import { TbSwitchHorizontal } from "react-icons/tb";

export default function IDE({ propState }: { propState: codeState }) {
  const [state, setState] = useState({
    code: editorPlaceholder,
    logs: propState.logs,
    selectedLanguage: propState.selectedLanguage,
    fileName: propState.fileName,
    selectedTab: propState.selectedTab,
    title: propState.title,
    description: propState.description,
    viewer: propState.viewer,
  });

  const updateState = (key: string, value: string | boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    const slug = generateSlug;
    const data = {
      slug: slug,
      title: state.title,
      description: state.description,
      code: state.code,
      logs: state.logs,
      fileName: state.fileName,
      language: state.selectedLanguage,
    };
    await createSnippet(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-[90vw] sm:w-[62vw] h-full justify-center items-center">
        <div className="flex flex-col w-full">
          <Input
            className="text-white text-5xl mb-5 outline-none bg-transparent border-b border-t-0 border-x-0 py-10 px-0 rounded-none border-white/10 placeholder:text-white/10"
            placeholder="Title"
            value={state.title}
            onChange={(e) => updateState("title", e.target.value)}
            disabled={state.viewer}
          />
          <textarea
            className="text-white text-base w-[90vw] sm:w-full h-fit resize-none mb-1 outline-none bg-transparent border-y-0 border-x-0 py-2 px-0 rounded-none border-white/10 placeholder:text-white/10"
            placeholder="Description"
            value={state.description}
            disabled={state.viewer}
            onChange={(e) => updateState("description", e.target.value)}
          />
        </div>
        <div className="flex self-start justify-between items-center w-full text-white rounded-lg h-fit border border-white/10 p-2">
          <div className="flex gap-3 items-center">
            <Input
              value={state.fileName}
              className="text-sm bg-[#1E1E1E] p-3 px-4 border-none rounded-lg outline-none"
              onChange={(e) => updateState("fileName", e.target.value)}
              placeholder="file name"
              disabled={state.viewer}
            />
            <h1
              className="text-sm bg-[#1E1E1E] p-3 px-4 rounded-lg outline-none"
              onClick={() => updateState("selectedTab", false)}
            >
              logs
            </h1>
            <TbSwitchHorizontal
              className="text-4xl"
              onClick={() => updateState("selectedTab", !state.selectedTab)}
            />
          </div>
          <LanguageSelect state={state} updateState={updateState} />
        </div>
        {state.selectedTab === true ? (
          <div className="bg-[#1E1E1E] rounded-lg w-[90vw] sm:w-[62vw] h-[90vh] border border-white/10 px-2 py-4">
            <Editor
              path={state.fileName}
              defaultLanguage="html"
              defaultValue={editorPlaceholder}
              language={state.selectedLanguage}
              theme="vs-dark"
              className="w-[60vw] h-[70vh]"
              options={{
                readOnly: state.viewer,
                minimap: {
                  enabled: false,
                },
              }}
              value={state.code}
              onChange={(value) => updateState("code", value ?? "")}
            />
          </div>
        ) : (
          <div className="bg-[#1E1E1E] rounded-lg flex flex-col h-[75vh] w-[90vw] sm:w-[62vw] border border-white/10">
            <Terminal state={state} updateState={updateState} />
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center mt-10">
        <Button className="" disabled={state.viewer}>
          Submit
        </Button>
      </div>
    </form>
  );
}
