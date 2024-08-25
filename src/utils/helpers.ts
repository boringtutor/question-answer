import OpenAI from "openai";

export const openai = new OpenAI({
    organization: "org-LDq1VhBumwKwGePWLOjUtOkJ",
    project: process.env.OPENAI_PROJECT,
})