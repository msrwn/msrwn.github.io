import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// Floating JavaScript code snippets on mouse move in hero section
const heroSection = document.getElementById('hero');
const jsCodeSnippets = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 
  'for', 'while', '{...}', '[ ]', '( )', '=> ', 'async', 'await',
  'import', 'export', 'class', 'new', 'this', 'true', 'false',
  'null', 'undefined', 'typeof', '==', '===', 'console.log()'
];

const directions = ['float-up', 'float-down', 'float-left', 'float-right', 'float-up-left', 'float-up-right'];

// Helper function to create floating code
function createFloatingCode(x, y, direction) {
  const randomCode = jsCodeSnippets[Math.floor(Math.random() * jsCodeSnippets.length)];
  const floatingCode = document.createElement('div');
  floatingCode.className = 'floating-js-code';
  floatingCode.classList.add(direction);
  floatingCode.textContent = randomCode;
  floatingCode.style.left = x + 'px';
  floatingCode.style.top = y + 'px';
  
  heroSection.appendChild(floatingCode);
  
  setTimeout(() => {
    floatingCode.remove();
  }, 2000);
}

let lastCodeTime = 0;
const codeInterval = 300;

// Mouse move event - single code snippet
heroSection.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastCodeTime < codeInterval) return;
  
  lastCodeTime = now;
  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  createFloatingCode(e.clientX, e.clientY, randomDirection);
});

// Click event - burst effect with multiple snippets
heroSection.addEventListener('click', (e) => {
  // Create a burst of 8 code snippets in different directions
  for (let i = 0; i < 8; i++) {
    const direction = directions[i % directions.length];
    // Stagger the creation slightly for a better effect
    setTimeout(() => {
      createFloatingCode(e.clientX, e.clientY, direction);
    }, i * 50);
  }
});

// Add confetti effect to GET IN TOUCH button
const getInTouchButton = document.querySelector('a[href="mailto:tran.dev.327@email.com"]');
if (getInTouchButton) {
  getInTouchButton.addEventListener('mouseenter', () => {
    const rect = getInTouchButton.getBoundingClientRect();
    const buttonCenterX = (rect.left + rect.right) / 2 / window.innerWidth;
    const buttonCenterY = (rect.top + rect.bottom) / 2 / window.innerHeight;
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: buttonCenterX, y: buttonCenterY }
    });
  });
}
