import OpenAI from "openai";
import {cpp, python, go, js, java, rust} from '../../public/codeFile';

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DSAPI || "",
    dangerouslyAllowBrowser: true
})

export default function RandomCode(language: string | null) {
    const random = Math.floor(Math.random() * 5);
    switch (language) {
        case "java":
            return java[random];
        case "rust":
            return rust[random];
        case "python":
            return python[random];
        case "js":
            return js[random];
        case "go":
            return go[random];
        default:
            return cpp[random];
    }
}
