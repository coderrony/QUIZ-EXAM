"use server"
import { prisma } from "@/lib/prisma";

export const userQueryByEmail = async(email: string) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        email: true,
      },
      take: 10, // Only get first 10 users
    });

    return users;
  } catch (error) {
    console.error("Error fetching users by email:", error);
    return [];
  }
}