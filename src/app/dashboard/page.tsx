import React from "react";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { checkUser } from "@/lib/checkUser";
import HomeSnippet from "@/components/HomeSnippet";
import { redirect } from "next/navigation";
import Link from "next/link";

const Dashboard = async () => {
  const { userId } = auth();
  const user = await checkUser();

  const snippets = await prisma.snippet.findMany({
    where: {
      creatorId: userId,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-start pt-5 pb-10 px-20 bg-transparent">
      <h1 className="text-white text-4xl md:text-5xl">
        Welcome Back {user?.name.split(" ")[0]}
      </h1>

      {snippets.length === 0 ? (
        <div className="h-full w-full  flex justify-center items-center">
          <h1 className="text-white text-base font-thin mt-1 mx-auto">
            You have no snippets, create one now
          </h1>
        </div>
      ) : (
        <h1 className="text-white font-extralight text-2xl mt-14 mb-5">
          Your Snippets :
        </h1>
      )}
      <div className="grid grid-cols-2 gap-8 w-full h-full ">
        {snippets.map((snippet) => (
          <Link href={`/${snippet.slug}`} key={snippet.id}>
            <HomeSnippet
              title={snippet.title}
              description={snippet.description}
              code={snippet.code}
              language={snippet.language}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
