import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seed(){
    console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	await prisma.user.deleteMany()
    console.timeEnd('🧹 Cleaned up the database...')
    await prisma.user.create({
        select:{id:true},
        data:{
            email: 'test@test.com',
            username: 'test',
            name: 'test',
        }
    })
}

seed()
.catch((e) => {
    console.error(e)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})