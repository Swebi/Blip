import IDE from "@/components/Editor";
import { editorPlaceholder } from "@/config/data";
import { codeState } from "@/lib/schema";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Slug({ params }: { params: { slug: string } }) {
  const snippet = await prisma.snippet.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!snippet) {
    notFound();
  }


  const propState: codeState = {
    code: snippet.code,
    logs: snippet.logs,
    selectedLanguage: snippet.language,
    fileName: snippet.fileName,
    selectedTab: true,
    title: snippet.title,
    description: snippet.description,
    viewer: true,
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-5 pb-10  bg-[#131415]">
      <IDE propState={propState} />
    </div>
  );
}
