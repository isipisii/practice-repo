function fibonacciSequence(startingNum, endNum, numberOfIteration) {
  let sequence = [startingNum, endNum];

  for (let i = 0; i <= numberOfIteration; i++) {
    let nextNum = startingNum + endNum;
    sequence.push(nextNum);
    startingNum = endNum;
    endNum = nextNum;
  }
  return sequence;
}

console.log(fibonacciSequence(0, 1, 5));