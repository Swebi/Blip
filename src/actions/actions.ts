"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { snippet } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";

export async function createSnippet(data: snippet) {
  const title = data.title as string;
  const slug = data.slug as string;
  const description = data.description as string;
  const code = data.code as string;
  const logs = data.logs as string;
  const language = data.language as string;
  const fileName = data.fileName as string;

  const { userId } = auth();

  try {
    await prisma.snippet.create({
      data: {
        slug,
        title,
        description,
        code,
        logs,
        fileName,
        language,
        creatorId: userId,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, slug };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create snippet" };
  }
}

export async function deleteSnippet({
  id,
  creatorID,
}: {
  id: string;
  creatorID: string;
}) {
  const { userId } = auth();

  if (userId === creatorID) {
    try {
      await prisma.snippet.delete({
        where: {
          id,
        },
      });
      revalidatePath("/dashboard");
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: "Failed to create snippet" };
    }
  } else {
    return { success: false, error: "Unauthorised" };
  }
}
