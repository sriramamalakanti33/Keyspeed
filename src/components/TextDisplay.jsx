function TextDisplay({ paragraph, userInput, currentIndex, isFinished }) {
  return (
    <div className="text-display">
      {paragraph.split('').map((char, index) => {
        const typedChar = userInput[index];
        const isCurrent = index === currentIndex && !isFinished;
        const status = index < userInput.length
          ? typedChar === char
            ? 'correct'
            : 'incorrect'
          : isCurrent
            ? 'current'
            : 'pending';

        return (
          <span key={`${char}-${index}`} className={`text-char ${status}`}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default TextDisplay;
