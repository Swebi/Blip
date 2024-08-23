"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const code = formData.get("code") as string;
  const logs = formData.get("logs") as string;
  const language = formData.get("selectedLanguage") as string;
  const fileName = formData.get("fileName") as string;

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
