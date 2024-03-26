import { codes } from "@/public/wordFile";

let prevIndex = -1;
export default function RandomCode() {
    let randIndex = getRandomIndex();
    while (prevIndex === randIndex) {
        randIndex = getRandomIndex();
    }
    prevIndex = randIndex;
    return codes[randIndex];
}

function getRandomIndex() {
    return Math.floor(Math.random() * codes.length);
}
