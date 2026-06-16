function TypingBox({ value, onChange, disabled, textareaRef }) {
  return (
    <div className="typing-box">
      <label htmlFor="typing-input" className="input-label">
        Your typing area
      </label>
      <textarea
        id="typing-input"
        ref={textareaRef}
        className="typing-input"
        rows="6"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder="Type the text above exactly as shown..."
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
}

export default TypingBox;
