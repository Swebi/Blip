"use client";

import Editor from "@monaco-editor/react";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createSnippet } from "@/actions/actions";
import Terminal from "./Terminal";
import LanguageSelect from "./LanguageSelect";
import { snippet, snippetState } from "@/lib/schema";
import { TbSwitchHorizontal } from "react-icons/tb";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useAuth } from "@clerk/nextjs";

export default function IDE({ propState }: { propState: snippetState }) {
  const { toast } = useToast();
  const router = useRouter();

  let slug = nanoid().substring(1, 6);

  useEffect(() => {
    slug = nanoid().substring(1, 6);
  }, []);

  const [state, setState] = useState({
    code: propState.code,
    logs: propState.logs,
    selectedLanguage: propState.selectedLanguage,
    fileName: propState.fileName,
    selectedTab: propState.selectedTab,
    title: propState.title,
    description: propState.description,
    viewer: propState.viewer,
    creator: propState.creator,
    createdAt: propState.createdAt,
    updatedAt: propState.updatedAt,
  });

  const updateState = (key: string, value: string | boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    if (!state.viewer) {
      const data = {
        slug: slug,
        title: state.title,
        description: state.description,
        code: state.code,
        logs: state.logs,
        fileName: state.fileName,
        language: state.selectedLanguage,
      };
      const response = await createSnippet(data);
      if (response.success) {
        toast({
          title: "Succesfully created snippet",
          description: `Your code is ${response.slug}`,
          className: "dark text-white border-white/10",
          action: (
            <Link href={`/${response.slug}`}>
              <ToastAction
                className="border-white/10"
                altText="Copy"
                onClick={() => {
                  navigator.clipboard.writeText(response.slug || "");
                }}
              >
                Copy
              </ToastAction>
            </Link>
          ),
        });
        router.push(`/${response.slug}`);
      } else {
        toast({
          variant: "destructive",
          title: "Could not create snippet",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => {
                router.push(`/create`);
              }}
            >
              Try again
            </ToastAction>
          ),
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "You do not have edit permissions for this snippet",
      });
    }
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
        <div className="flex self-start justify-between items-center w-full text-white rounded-lg h-fit border border-white/10 p-2 bg-[#131415]">
          <div className="flex gap-3 items-center">
            <Input
              value={state.fileName}
              className="text-sm bg-[#1E1E1E] p-3 px-4 border-none rounded-lg outline-none"
              onChange={(e) => updateState("fileName", e.target.value)}
              placeholder="file name"
              disabled={state.viewer}
            />
            <h1
              className="text-sm bg-[#1E1E1E] p-3 px-4 rounded-lg outline-none cursor-pointer"
              onClick={() => updateState("selectedTab", false)}
            >
              logs
            </h1>
            <TbSwitchHorizontal
              className="text-4xl cursor-pointer"
              onClick={() => updateState("selectedTab", !state.selectedTab)}
            />
          </div>
          <LanguageSelect state={state} updateState={updateState} />
        </div>
        {state.selectedTab === true ? (
          <div className="bg-[#1E1E1E] rounded-lg w-[90vw] sm:w-[62vw] h-[80vh] border border-white/10 px-2 py-4">
            <Editor
              path={state.fileName}
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
      {state.viewer ? (
        <div className="flex w-full mt-4 justify-between items-start">
          <h1 className="text-white/20 text-sm">
            Created by {propState.creator}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white/20 text-sm">
              Created On {state.createdAt?.toLocaleString()}
            </h1>
            <h1 className="text-white/20 text-sm">
              Modified On {state.updatedAt?.toLocaleString()}
            </h1>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full flex justify-center items-center mt-10">
        <Button className="" disabled={state.viewer}>
          Submit
        </Button>
      </div>
    </form>
  );
}
