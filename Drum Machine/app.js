// Drum pad configurations with audio URLs
const DRUM_PADS_CONFIG = [
    {
        id: 'heater-1',
        key: 'Q',
        name: 'Heater 1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        id: 'heater-2',
        key: 'W',
        name: 'Heater 2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        id: 'heater-3',
        key: 'E',
        name: 'Heater 3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        id: 'heater-4',
        key: 'A',
        name: 'Heater 4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        id: 'clap',
        key: 'S',
        name: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Clap.mp3'
    },
    {
        id: 'open-hh',
        key: 'D',
        name: 'Open HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Open-HH.mp3'
    },
    {
        id: 'kick-n-hat',
        key: 'Z',
        name: "Kick n' Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        id: 'kick',
        key: 'X',
        name: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        id: 'closed-hh',
        key: 'C',
        name: 'Closed HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Closed_HH.mp3'
    }
];

// React Component
const { useState, useEffect, useRef } = React;

function DrumMachine() {
    const [display, setDisplay] = useState('');
    const [activePad, setActivePad] = useState(null);
    const audioRefs = useRef({});

    // Handle drum pad click
    const playSound = (padConfig) => {
        const audio = audioRefs.current[padConfig.key];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(err => console.log('Audio play error:', err));
            setDisplay(padConfig.name);
            setActivePad(padConfig.key);
            setTimeout(() => setActivePad(null), 100);
        }
    };

    // Handle keyboard press
    useEffect(() => {
        const handleKeyPress = (e) => {
            const key = e.key.toUpperCase();
            const padConfig = DRUM_PADS_CONFIG.find(pad => pad.key === key);
            if (padConfig) {
                playSound(padConfig);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div id="drum-machine">
            <div className="drum-machine-title">🥁 DRUM MACHINE</div>
            <div id="display">{display || '• Select a Drum •'}</div>
            <div className="drum-pads">
                {DRUM_PADS_CONFIG.map((padConfig) => (
                    <button
                        key={padConfig.key}
                        id={padConfig.id}
                        className={`drum-pad ${activePad === padConfig.key ? 'active' : ''}`}
                        onClick={() => playSound(padConfig)}
                    >
                        {padConfig.key}
                        <audio
                            ref={(el) => (audioRefs.current[padConfig.key] = el)}
                            id={padConfig.key}
                            className="clip"
                            src={padConfig.url}
                        />
                    </button>
                ))}
            </div>
            <div className="footer">
                💡 Click pads or press Q, W, E, A, S, D, Z, X, C
            </div>
        </div>
    );
}

// Render the app
ReactDOM.render(<DrumMachine />, document.getElementById('root'));
