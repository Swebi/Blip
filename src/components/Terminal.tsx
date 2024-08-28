import { snippetState } from "@/lib/schema";
import React from "react";

const Terminal = ({
  state,
  updateState,
}: {
  state: snippetState;
  updateState: (key: string, value: string) => void;
}) => {
  return (
    <>
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
          disabled={state.viewer}
        />
      </div>
    </>
  );
};

export default Terminal;
