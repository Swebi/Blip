import React from "react";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";

const HomeSnippet = ({
  title,
  description,
  code,
  language,
}: {
  title: string;
  description: string;
  code: string;
  language: string;
}) => {
  return (
    <div className="flex flex-col gap-2 w-[600px] max-h-[400px] p-5 border bg-[#131415] rounded-2xl border-white/10">
      <SyntaxHighlighter
        language={language}
        style={vs2015}
        customStyle={{ lineHeight: "1.1", fontSize: "10px" }}
        className="hiddenScroll rounded-lg p-10"
      >
        {code}
      </SyntaxHighlighter>
      <div className="flex flex-col">
        <p className="text-white text-xs">
          {language ? language.toUpperCase() : "plaintext"}
        </p>
        <h1 className="text-3xl mt-2 text-white">
          {title ? title : "No Title"}
        </h1>
        <h1 className="text-lg text-white">
          {description ? description : "No Description"}
        </h1>
      </div>
    </div>
  );
};

export default HomeSnippet;
