export function calculateWPM(typed, target, elapsedSeconds) {
  const correctChars = typed.split('').reduce((count, char, index) => {
    if (index >= target.length) {
      return count;
    }
    return char === target[index] ? count + 1 : count;
  }, 0);

  if (elapsedSeconds <= 0 || typed.length === 0) {
    return 0;
  }

  const words = correctChars / 5;
  const minutes = elapsedSeconds / 60;
  return Math.max(0, Math.round(words / minutes));
}

export function calculateAccuracy(typed, target) {
  if (typed.length === 0) {
    return 0;
  }

  const correct = typed.split('').reduce((count, char, index) => {
    if (index >= target.length) {
      return count;
    }
    return char === target[index] ? count + 1 : count;
  }, 0);

  const accuracy = (correct / typed.length) * 100;
  return Math.max(0, Math.round(accuracy));
}
