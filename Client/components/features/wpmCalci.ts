function calculateWPM(startTime: number, typedChars: string, typedErr: number[]) {
  const elapsedTime = new Date().getTime() - startTime;
  const minutesElapsed = elapsedTime / 60000;
  //getting the total number for words
  const totalWords = typedChars.trim().split(/\s+/).length
  const totalChars = typedChars.trim().length
  return {
    wpm: (totalWords / minutesElapsed).toFixed(2),
    accuracy: ((1 - (typedErr.length / totalChars)) * 100).toFixed(2)
};
}
export default calculateWPM;