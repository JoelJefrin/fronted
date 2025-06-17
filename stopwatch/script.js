let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.textContent = formatTime(elapsedTime);
  lapsList.appendChild(li);
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
