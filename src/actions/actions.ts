"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { snippet } from "@/lib/schema";

export async function createSnippet(data: snippet) {
  const title = data.title as string;
  const slug = data.slug as string;
  const description = data.description as string;
  const code = data.code as string;
  const logs = data.logs as string;
  const language = data.language as string;
  const fileName = data.fileName as string;

  await prisma.snippet.create({
    data: {
      slug,
      title,
      description,
      code,
      logs,
      fileName,
      language,
    },
  });

  //   revalidatePath("/posts");
}

