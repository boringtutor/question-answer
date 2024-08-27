import { MOCK_QUESTIONS } from "@/utils/misc";

export type Question = typeof MOCK_QUESTIONS.answer[0];
export type User = {
    name:string;
    email:string;
    username:string;
}