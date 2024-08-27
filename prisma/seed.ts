import { PrismaClient } from "@prisma/client";
import getMockUser, {
  getAnswerFromMock,
  getCorrectAnswerFromMock,
  getExplainationFromMock,
  getMockQuestion,
  getQuestionFromMock,
} from "./utils/misc";
const prisma = new PrismaClient();



async function seed() {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);

  console.time("🧹 Cleaned up the database...");
  await prisma.user.deleteMany();
  console.timeEnd("🧹 Cleaned up the database...");
  const totalUsers = 3;
  for(let i=0;i<totalUsers;i++){
      
      const mockUser = getMockUser();

      await prisma.user.create({
        data:{
            fullName:mockUser.name,
            email:mockUser.email,
            username:mockUser.username,
            notes:{
                create:Array.from({length:1}).map(()=>{
                    return{
                         title:"Hello",
                         content:"World",
                         quizCollection:{
                            create:{
                                quizItems:{
                                    create:Array.from({length:4}).map((_,index)=>{
                                        const result = getMockQuestion(index);
                                        const answer = getAnswerFromMock(result);
                                        return{
                                            questionText:getQuestionFromMock(result),
                                            correctAnswer:getCorrectAnswerFromMock(result),
                                            answerOptions:{
                                                create: Array.from({length:4}).map((_,ii)=>{
                                                    return {
                                                        optionText:answer[ii]
                                                    }
                                                })
                                            },
                                            explanation:getExplainationFromMock(result),
                                        }
                                    })
                                },
                            }
                         }                 
                    }
                })
            }
        }
      });}
  
}

 

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
