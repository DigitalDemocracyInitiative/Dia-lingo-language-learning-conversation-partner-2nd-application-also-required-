let sessionActive = false;
let targetLanguage = 'Spanish';
let turnCount = 0;

const SYSTEM_PROMPT = `You are a friendly conversation partner helping someone practice Spanish.

RULES:
1. Only speak in Spanish
2. Keep responses under 20 words
3. Ask simple follow-up questions
4. Never translate to English
5. Never teach grammar

Start by asking: "¿Qué hiciste hoy?"`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'START') {
    sessionActive = true;
    sendResponse({ prompt: SYSTEM_PROMPT });
  }
  else if (request.action === 'PROCESS') {
    turnCount++;
    sendResponse({ prompt: request.text });
  }
  return true;
});