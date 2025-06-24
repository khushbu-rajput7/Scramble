// Character sets for different effects
const charSets = {
    matrix: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    cyber: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|\\:";\'<>?,./~`',
    neon: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    glitch: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|\\:";\'<>?,./~`',
    terminal: 'abcdefghijklmnopqrstuvwxyz0123456789._-/',
    holographic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
};

// Target texts for each effect
const targetTexts = {
    matrix: ['THE MATRIX', 'WAKE UP NEO', 'FOLLOW THE RABBIT', 'RED OR BLUE PILL'],
    cyber: ['CYBER PUNK', 'NEURAL LINK', 'DATA STREAM', 'QUANTUM CODE'],
    neon: ['NEON LIGHTS', 'ELECTRIC DREAMS', 'SYNTHWAVE', 'RETRO FUTURE'],
    glitch: ['SYSTEM ERROR', 'CORRUPTED DATA', 'BUFFER OVERFLOW', 'ACCESS DENIED'],
    terminal: ['root@system', 'loading...', 'access granted', 'compile.sh'],
    holographic: ['HOLOGRAM', 'PROJECTION', 'LIGHT WAVE', 'DIMENSION']
};

let currentSpeed = 50; // milliseconds between character changes

// Main scramble function
function scrambleText(type) {
    const element = document.getElementById(`${type}-text`);
    const charset = charSets[type];
    const texts = targetTexts[type];
    const targetText = texts[Math.floor(Math.random() * texts.length)];

    // Set data-text for glitch effect
    if (type === 'glitch') {
        element.setAttribute('data-text', targetText);
    }

    let currentText = element.textContent.trim();
    if (type === 'terminal') {
        currentText = currentText.replace('> ', '').replace('_', '');
    }

    const maxLength = Math.max(currentText.length, targetText.length);
    let iteration = 0;

    const interval = setInterval(() => {
        let scrambledText = '';

        for (let i = 0; i < maxLength; i++) {
            if (i < targetText.length) {
                if (iteration > i * 3) {
                    scrambledText += targetText[i];
                } else {
                    scrambledText += charset[Math.floor(Math.random() * charset.length)];
                }
            }
        }

        // Special formatting for terminal
        if (type === 'terminal') {
            element.textContent = scrambledText;
        } else {
            element.textContent = scrambledText;
        }

        iteration++;

        if (iteration > maxLength * 3 + 10) {
            clearInterval(interval);
            if (type === 'terminal') {
                element.textContent = targetText;
            } else {
                element.textContent = targetText;
            }

            // Add completion effect
            addCompletionEffect(element, type);
        }
    }, currentSpeed);
}

// Add visual effects when scrambling completes
function addCompletionEffect(element, type) {
    element.style.transform = 'scale(1.05)';
    element.style.filter = 'brightness(1.3)';

    // Type-specific effects
    switch (type) {
        case 'matrix':
            element.style.textShadow = '0 0 20px #00ff41, 0 0 40px #00ff41';
            break;
        case 'cyber':
            element.style.textShadow = '0 0 25px #00d9ff, 0 0 50px #00d9ff';
            break;
        case 'neon':
            element.style.textShadow = '0 0 20px #ff006e, 0 0 40px #ff006e, 0 0 60px #ff006e';
            break;
        case 'holographic':
            element.style.filter = 'brightness(1.5) saturate(1.5)';
            break;
    }

    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.filter = '';
        element.style.textShadow = '';
    }, 500);
}

// Scramble all texts simultaneously
function scrambleAll() {
    const types = ['matrix', 'cyber', 'neon', 'glitch', 'terminal', 'holographic'];
    types.forEach((type, index) => {
        setTimeout(() => {
            scrambleText(type);
        }, index * 200);
    });
}

// Set scrambling speed
function setSpeed(speed) {
    switch (speed) {
        case 'fast':
            currentSpeed = 20;
            break;
        case 'slow':
            currentSpeed = 100;
            break;
        default:
            currentSpeed = 50;
    }
}

// Randomize all texts
function randomizeTexts() {
    const types = ['matrix', 'cyber', 'neon', 'glitch', 'terminal', 'holographic'];
    types.forEach(type => {
        const element = document.getElementById(`${type}-text`);
        const texts = targetTexts[type];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        element.textContent = randomText;

        if (type === 'glitch') {
            element.setAttribute('data-text', randomText);
        }
    });
}

// Auto-scramble effect every few seconds
setInterval(() => {
    if (Math.random() < 0.3) {
        const types = ['matrix', 'cyber', 'neon', 'glitch', 'terminal', 'holographic'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        scrambleText(randomType);
    }
}, 8000);

// Add typing effect to specific elements
function addTypingEffect(element) {
    element.classList.add('typing-effect');
    setTimeout(() => {
        element.classList.remove('typing-effect');
    }, 3000);
}

// Enhance hover effects
document.querySelectorAll('.effect-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const text = card.querySelector('.scramble-text');
        text.style.transform = 'scale(1.02)';
        text.style.filter = 'brightness(1.1)';
    });

    card.addEventListener('mouseleave', () => {
        const text = card.querySelector('.scramble-text');
        text.style.transform = 'scale(1)';
        text.style.filter = '';
    });
});

// Initialize with a welcome scramble
setTimeout(() => {
    scrambleText('matrix');
}, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ':
            e.preventDefault();
            scrambleAll();
            break;
        case '1':
            scrambleText('matrix');
            break;
        case '2':
            scrambleText('cyber');
            break;
        case '3':
            scrambleText('neon');
            break;
        case '4':
            scrambleText('glitch');
            break;
        case '5':
            scrambleText('terminal');
            break;
        case '6':
            scrambleText('holographic');
            break;
    }
});