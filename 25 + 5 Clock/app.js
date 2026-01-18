// React Component
const { useState, useEffect, useRef } = React;

function Clock() {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isSession, setIsSession] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const beepRef = useRef(null);
    const intervalRef = useRef(null);

    // Timer effect
    useEffect(() => {
        if (!isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    // Play beep sound
                    if (beepRef.current) {
                        beepRef.current.currentTime = 0;
                        beepRef.current.play().catch(err => console.log('Audio play error:', err));
                    }
                    
                    // Switch between session and break
                    if (isSession) {
                        setIsSession(false);
                        return breakLength * 60;
                    } else {
                        setIsSession(true);
                        return sessionLength * 60;
                    }
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, isSession, breakLength, sessionLength]);

    // Format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle break length change
    const handleBreakDecrement = () => {
        if (breakLength > 1 && !isRunning) {
            setBreakLength(breakLength - 1);
        }
    };

    const handleBreakIncrement = () => {
        if (breakLength < 60 && !isRunning) {
            setBreakLength(breakLength + 1);
        }
    };

    // Handle session length change
    const handleSessionDecrement = () => {
        if (sessionLength > 1 && !isRunning) {
            setSessionLength(sessionLength - 1);
            if (isSession) {
                setTimeLeft((sessionLength - 1) * 60);
            }
        }
    };

    const handleSessionIncrement = () => {
        if (sessionLength < 60 && !isRunning) {
            setSessionLength(sessionLength + 1);
            if (isSession) {
                setTimeLeft((sessionLength + 1) * 60);
            }
        }
    };

    // Handle start/stop
    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    // Handle reset
    const handleReset = () => {
        setIsRunning(false);
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(25 * 60);
        setIsSession(true);
        if (beepRef.current) {
            beepRef.current.pause();
            beepRef.current.currentTime = 0;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    return (
        <div className="clock-container">
            <div className="clock-title">⏱️ 25 + 5 Clock</div>

            {/* Controls */}
            <div className="controls-wrapper">
                <div className="control-group">
                    <label id="break-label">Break Length</label>
                    <div className="length-display" id="break-length">
                        {breakLength}
                    </div>
                    <div className="button-group">
                        <button
                            id="break-decrement"
                            className="control-button"
                            onClick={handleBreakDecrement}
                            disabled={isRunning}
                        >
                            −
                        </button>
                        <button
                            id="break-increment"
                            className="control-button"
                            onClick={handleBreakIncrement}
                            disabled={isRunning}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="control-group">
                    <label id="session-label">Session Length</label>
                    <div className="length-display" id="session-length">
                        {sessionLength}
                    </div>
                    <div className="button-group">
                        <button
                            id="session-decrement"
                            className="control-button"
                            onClick={handleSessionDecrement}
                            disabled={isRunning}
                        >
                            −
                        </button>
                        <button
                            id="session-increment"
                            className="control-button"
                            onClick={handleSessionIncrement}
                            disabled={isRunning}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Timer Display */}
            <div className={`timer-display ${isRunning ? 'running' : ''}`}>
                <div id="timer-label">
                    {isSession ? 'Session' : 'Break'}
                </div>
                <div id="time-left">
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Control Buttons */}
            <div className="timer-controls">
                <button id="start_stop" className="timer-button" onClick={handleStartStop}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button id="reset" className="timer-button" onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
}

// Render the app
ReactDOM.render(<Clock />, document.getElementById('root'));
