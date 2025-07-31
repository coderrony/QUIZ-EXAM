"use server";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data-query/user";
import { RegisterFormType } from "@/app/auth/_components/RegisterForm";
import { prisma } from "@/lib/prisma";


export const register = async (values:RegisterFormType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }
   const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  const res=  await sendVerificationEmail(verificationToken.email, verificationToken.token);


  if(res.success){ 
    return { success: "Confirmation email sent!" };
  }else{ 
    return { error: "Could not send confirmation email." };
  }

};
