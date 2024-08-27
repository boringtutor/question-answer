import { Question, User } from '@/types/misc';
import { MOCK_QUESTIONS } from '@/utils/misc';
import { faker } from '@faker-js/faker'

export default function getMockUser():User{
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        username:faker.internet.userName(),
    }
}

export function getMockQuestion(index:number):Question{
    return MOCK_QUESTIONS.answer[index];
}

export function getQuestionFromMock(result:Question){
    return result.question;
}

export function getAnswerFromMock(result:Question){
    return [
        result.answer1,
        result.answer2,
        result.answer3,
        result.answer4,
    ]
}
export function getCorrectAnswerFromMock(result:Question){
    return result.correctAnswer;
}

export function getExplainationFromMock(result:Question){
    return result.explanation;
}

