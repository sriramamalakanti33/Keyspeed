function Controls({ onRestart, onTimeChange, currentLimit, disabled }) {
  const options = [30, 60, 90];

  return (
    <div className="controls-panel">
      <div className="control-group">
        <label htmlFor="timer-select">Timer</label>
        <select
          id="timer-select"
          value={currentLimit}
          onChange={(event) => onTimeChange(Number(event.target.value))}
          disabled={disabled}
          className="timer-select"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} seconds
            </option>
          ))}
        </select>
      </div>

      <button className="button button-primary" type="button" onClick={onRestart}>
        Restart
      </button>

      <p className="control-hint">
        Change the duration before your first keystroke.
      </p>
    </div>
  );
}

export default Controls;
