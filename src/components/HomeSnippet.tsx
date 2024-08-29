"use client";
import React from "react";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Button } from "./ui/button";
import Link from "next/link";
import { deleteSnippet } from "@/actions/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";

const HomeSnippet = ({
  title,
  description,
  code,
  language,
  id,
  slug,
  creatorID,
  createdAt,
}: {
  title: string;
  description: string;
  code: string;
  language: string;
  id: string;
  slug: string;
  creatorID: string;
  createdAt: string;
}) => {
  return (
    <div className="flex flex-col gap-2 w-[400px] md:w-[600px] max-h-[550px]  h-fit p-5 pb-6 border bg-[#131415] rounded-2xl border-white/10">
      <div className="bg-[#1E1E1E] rounded-lg p-3 ">
        <Link href={`/${slug}`} key={id}>
          <SyntaxHighlighter
            language={language}
            style={vs2015}
            customStyle={{
              lineHeight: "1.1",
              fontSize: "10px",
              height: "200px",
            }}
            className="hiddenScroll "
          >
            {code}
          </SyntaxHighlighter>
        </Link>
      </div>

      <div className="flex w-full justify-between items-start">
        <Link href={`/${slug}`} key={id}>
          <div className="flex flex-col">
            <p className="text-white text-xs">
              {language ? language.toUpperCase() : "plaintext"}
            </p>
            <h1
              className={`overflow-y-scroll  hiddenScroll h-[40px] ${
                !title
                  ? "text-white/30 text-3xl mt-2"
                  : "text-3xl mt-2 text-white"
              }`}
            >
              {title ? title : "No Title"}
            </h1>
            <h1
              className={`overflow-y-scroll hiddenScroll h-[55px]  ${
                !description ? "text-white/30 text-lg" : "text-lg text-white"
              }`}
            >
              {description ? description : "No Description"}
            </h1>
          </div>
        </Link>
        <div className="flex flex-col items-end gap-2">
          <h1 className="text-white/30">{createdAt}</h1>
          <Dialog>
            <DialogTrigger>
              <MdDelete className="text-3xl text-white" />
            </DialogTrigger>
            <DialogContent className="dark border-none">
              <DialogHeader className="dark">
                <DialogTitle className="text-white">
                  Are you sure you want to delete the snippet?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <Button
                variant={"destructive"}
                className="mt-2"
                onClick={() => {
                  deleteSnippet({ id, creatorID });
                }}
              >
                Delete
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default HomeSnippet;
