'use server';

import { getUserById } from '@/data-query/user';
import { prisma } from '@/lib/prisma';
import { NewTestSchema, NewTestSchemaType } from '@/schemas/dashboard';
import { revalidatePath } from 'next/cache';

export const newTest = async (value: NewTestSchemaType,userId:string) => {
  const validatedFields = NewTestSchema.safeParse(value);
  try {
 
    const existingUser =await getUserById(userId)
    
    if (!existingUser) {
      return { error: 'User not found!' };
    }

    if (!validatedFields.success) {
      return { error: 'Invalid fields!' };
    }

    const { name, position, durationMin } = validatedFields.data;

    await prisma.test.create({
      data:{name,position,userId,durationMin:Number(durationMin),date:new Date()}
    })
     revalidatePath("/dashboard/tests")
      return { success: "New Test added" };

  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: String(error) };
  }
};

// export const getTestsByUserID = async(userId:string)=>{ 
//   try {
//     const tests =await prisma.test.findMany({
//       where:{userId}
//     })
//     return tests
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//     throw new Error(String(error));
//   }
// }

export const getTestByID = async(testID:string)=>{ 
  try {
    const tests =await prisma.test.findUnique({
      where:{id:testID},
      include:{
        groups:{
          include:{
            questions:true
          }
        }
      }
    })
    return tests
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}