function solution(n, words) {
  let nArr = Array(n)
    .fill(1)
    .map((a, b) => a + b);
  let wordsArr = [];
  let currentN;
  let loserIndex;

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i].split("");
    const currentFirstAlphabet = currentWord[0];
    const prevWord = words[i - 1] ? words[i - 1].split("") : "";
    const prevLastAlphabet = prevWord[prevWord.length - 1];
    currentN = nArr[i % n];

    if (wordsArr.includes(words[i]) || currentWord.length < 2) {
      loserIndex = i;
      break;
    } else if (currentFirstAlphabet !== prevLastAlphabet) {
      if (i > 0) {
        loserIndex = i;
        break;
      }
    }

    wordsArr.push(words[i]);
  }

  return loserIndex ? [currentN, Math.floor(loserIndex / (currentN + 1)) + 1] : [0, 0];
}
