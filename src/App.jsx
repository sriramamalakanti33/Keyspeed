import { useEffect, useMemo, useRef, useState } from 'react';
import TypingBox from './components/TypingBox.jsx';
import TextDisplay from './components/TextDisplay.jsx';
import Stats from './components/Stats.jsx';
import Controls from './components/Controls.jsx';
import { calculateAccuracy, calculateWPM } from './utils/calculations.js';

const DEFAULT_TIME = 60;
const PARAGRAPH =
  'Typing speed is an essential skill for modern productivity. Focus on accuracy first, then accelerate with confidence.';
const BEST_WPM_KEY = 'keyspeed_best_wpm';

function App() {
  const [timeLimit, setTimeLimit] = useState(DEFAULT_TIME);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [userInput, setUserInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [bestWPM, setBestWPM] = useState(0);

  const intervalRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const storedScore = localStorage.getItem(BEST_WPM_KEY);
    if (storedScore) {
      setBestWPM(Number(storedScore));
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const elapsedSeconds = hasStarted ? timeLimit - timeLeft : 0;
  const wpm = useMemo(
    () => calculateWPM(userInput, PARAGRAPH, elapsedSeconds),
    [userInput, elapsedSeconds]
  );
  const accuracy = useMemo(
    () => calculateAccuracy(userInput, PARAGRAPH),
    [userInput]
  );

  useEffect(() => {
    if (wpm > bestWPM) {
      setBestWPM(wpm);
      localStorage.setItem(BEST_WPM_KEY, String(wpm));
    }
  }, [wpm, bestWPM]);

  const handleInputChange = (value) => {
    if (isFinished || timeLeft === 0) {
      return;
    }

    if (!hasStarted) {
      setHasStarted(true);
      setIsRunning(true);
    }

    setUserInput(value);
  };

  const handleRestart = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
    setUserInput('');
    setTimeLeft(timeLimit);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleTimeLimitChange = (value) => {
    if (hasStarted) {
      return;
    }
    setTimeLimit(value);
    setTimeLeft(value);
  };

  return (
    <div className="app-shell">
      <div className="glass-card">
        <header className="hero-panel">
          <div>
            <p className="eyebrow">KeySpeed</p>
            <h1>Typing speed test with precise feedback</h1>
          </div>
          <p className="hero-copy">
            Start typing to activate the timer. Track WPM, accuracy, and your best
            score across sessions.
          </p>
        </header>

        <div className="panel-grid">
          <div className="main-column">
            <TextDisplay
              paragraph={PARAGRAPH}
              userInput={userInput}
              currentIndex={userInput.length}
              isFinished={isFinished || timeLeft === 0}
            />

            <TypingBox
              value={userInput}
              onChange={handleInputChange}
              disabled={isFinished || timeLeft === 0}
              textareaRef={textareaRef}
            />
          </div>

          <aside className="sidebar">
            <Stats timeLeft={timeLeft} timeLimit={timeLimit} wpm={wpm} accuracy={accuracy} bestWPM={bestWPM} />
            <Controls
              onRestart={handleRestart}
              onTimeChange={handleTimeLimitChange}
              currentLimit={timeLimit}
              disabled={hasStarted}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
