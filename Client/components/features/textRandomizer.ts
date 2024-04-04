import { wordList, preparr } from "../../public/wordFile";

export default function getRandomPhrase(){
    const len = Math.floor(Math.random()*8 + 7);
    let phrase = ""
    for (let i = 0; i < len ; i++){
        const isprep = Math.random() < 0.3;
        if (isprep){
            //no of words in wordList array -> 68
            const rprepIndex = Math.floor(Math.random()*68)
            phrase += preparr[rprepIndex] + ' ';
        } else{
            //no of words in wordList array -> 25087
            const rIndex = Math.floor(Math.random()*25087);
            phrase += wordList[rIndex] + ' ';
        }
    }
    return phrase.trim()
}
