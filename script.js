// Set up speech recognition
const recognition = new window.webkitSpeechRecognition();
recognition.continuous = true; // Keeps listening until manually stopped
recognition.interimResults = false; // Only return final results

// Negative phrases to watch for
const negativePhrases = ["this sucks", "i hate this", "this is terrible", "i can't do this"];

// Elements from HTML
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const responseDiv = document.getElementById('response');

// Start button click event
startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    responseDiv.innerText = "Listening... be positive! 😊";
});

// Stop button click event
stopBtn.addEventListener('click', () => {
    recognition.stop();
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    responseDiv.innerText = "Stopped listening.";
});

// Speech recognition event when result is received
recognition.onresult = (event) => {
    let transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    
    // Check for negative phrases
    for (let phrase of negativePhrases) {
        if (transcript.includes(phrase)) {
            responseDiv.innerText = `🤨 No negativity! "${transcript}" is not allowed!`;
            // Optionally, add a sound or funny GIF response here
            return; // Exit after the first match
        }
    }
    
    responseDiv.innerText = `You said: "${transcript}" - Keep it positive! ✨`;
};

// Handle errors
recognition.onerror = (event) => {
    responseDiv.innerText = `Error occurred: ${event.error}`;
};
