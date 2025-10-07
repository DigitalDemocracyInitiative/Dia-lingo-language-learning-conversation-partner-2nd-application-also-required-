let lastInput = '';

function findElements() {
  return {
    textarea: document.querySelector('textarea'),
    button: document.querySelector('button[data-testid="send-button"]')
  };
}

function inject(text) {
  const { textarea, button } = findElements();
  if (!textarea || !button) return;

  textarea.value = text;
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  setTimeout(() => button.click(), 100);
}

new MutationObserver(() => {
  const { textarea } = findElements();
  if (!textarea) return;

  const text = textarea.value.trim();
  if (text && text !== lastInput) {
    lastInput = text;
    textarea.value = '';

    chrome.runtime.sendMessage({ action: 'PROCESS', text }, (response) => {
      if (response) inject(response.prompt);
    });
  }
}).observe(document.body, { subtree: true, childList: true });

chrome.runtime.sendMessage({ action: 'START' }, (response) => {
  if (response) inject(response.prompt);
});