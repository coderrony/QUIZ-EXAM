// import { cache } from 'react'
import { prisma } from '@/lib/prisma'

// lib/cache.ts
// const cacheStore = new Map<string, { data: any, expiresAt: number }>()

// export async function getTestByUserID(userId: string) {
//   const key = `tests-${userId}`
//   const now = Date.now()

//   const cached = cacheStore.get(key)
//   if (cached && cached.expiresAt > now) {
//     return cached.data
//   }

//   const data = await prisma.test.findMany({
//     where: { userId },
//     include: {
//       groups: {
//         include: {
//           questions: true,
//         },
//       },
//       assignedTests: true,
//       testSessions: true,
//       testQuestions: true,
//     },
//   })

//   cacheStore.set(key, { data, expiresAt: now + 5 * 60 * 1000 }) // 5 mins
//   return data
// }



export const getTestByUserID =async (userId: string) => {
  return await prisma.test.findMany({
    where: { userId },
    include: {
      groups: {
        include: {
          questions: true,
        },
      },
      assignedTests: {
        include: {
          user: true,
        },
        orderBy:{ assignedAt: 'desc' },
      },
      
      testSessions: {
        include: {
          userAnswers: true,
        },
      },
      testQuestions: {
        include: {
          question: true,
        },
      },
    },
  })
}



export const getAssignTestByToken = async(token:string)=>{ 
  return await prisma.assignedTest.findFirst({
    where: { loginToken:token },
    include:{
      test:{
        include:{
          testQuestions:{
            include:{
              question:{
                include:{
                  choices:{
                    orderBy: { index: 'asc' }
                  },
                 
                }
              }
            }
          }
        }
      }
    }
  })
}


export const getUserTestSessionByUserId =async  (userId:string) =>{
  try {
    return await prisma.userTestSession.findFirst({
      where:{userId},
      include:{
        userAnswers:{
          include:{
            question:true
          }
        },
        user:true
      }
    })
  } catch (error) {
    console.log(error);
    
    return null
    
  }
}

export const getTestQuestionByTestId =async  (testId:string) =>{
  try {
    return await prisma.testQuestion.findMany({
      where:{testId},
      include:{
        question:true
      }
    })
  } catch (error) {
    console.log(error);
    
    return null
    
  }
}


