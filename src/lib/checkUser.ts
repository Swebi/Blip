import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export const checkUser = async () => {
  const user = await currentUser();

  // Check for current logged in clerk user

  if (!user) {
    return null;
  }

  // Check if the user is already in the database
  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  // If user is in database, return user
  if (loggedInUser) {
    return loggedInUser;
  }

  // If not in database, create new user
  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      name: `${user.firstName}`,
    },
  });

  return newUser;
};
