function Stats({ timeLeft, timeLimit, wpm, accuracy, bestWPM }) {
  return (
    <div className="stats-panel">
      <div className="stats-card">
        <p className="stats-title">Timer</p>
        <p className="stats-value">{timeLeft}s / {timeLimit}s</p>
      </div>

      <div className="stats-card">
        <p className="stats-title">WPM</p>
        <p className="stats-value">{wpm}</p>
      </div>

      <div className="stats-card">
        <p className="stats-title">Accuracy</p>
        <p className="stats-value">{accuracy}%</p>
      </div>

      <div className="stats-card highlight-card">
        <p className="stats-title">Best score</p>
        <p className="stats-value">{bestWPM}</p>
      </div>
    </div>
  );
}

export default Stats;
