// Array of quotes with authors
const QUOTES = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers"
    },
    {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky"
    },
    {
        text: "Whether you think you can, or you think you can't – you're right.",
        author: "Henry Ford"
    }
];

// React Component
const { useState, useEffect } = React;

function QuoteMachine() {
    const [currentQuote, setCurrentQuote] = useState(QUOTES[0]);

    // Get random quote
    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setCurrentQuote(QUOTES[randomIndex]);
    };

    // Initialize with a random quote on mount
    useEffect(() => {
        getRandomQuote();
    }, []);

    // Generate tweet URL
    const tweetUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(currentQuote.text)}" — ${encodeURIComponent(currentQuote.author)}`;

    return (
        <div id="quote-box">
            <div id="text">
                "{currentQuote.text}"
            </div>
            <div id="author">
                {currentQuote.author}
            </div>
            <div className="button-container">
                <button id="new-quote" onClick={getRandomQuote}>
                    New Quote
                </button>
                <a
                    id="tweet-quote"
                    href={tweetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Tweet Quote
                </a>
            </div>
        </div>
    );
}

// Render the app
ReactDOM.render(<QuoteMachine />, document.getElementById('root'));
