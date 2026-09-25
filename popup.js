const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxsZ8R0NzGE8HpruKksIhznvST612VIT7KB3eYx_WOvhanztgDsSUvezoY5aaEDA8BwgQ/exec";
const TOKEN = "basic-authentication_token";

document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const copyBtn = document.getElementById('copyBtn');
  let currentFolderId = null;

  // Use the activeTab permission to get the URL of the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    
    // Check if the current URL is a Google Drive folder (handles /drive/folders/ and /drive/u/0/folders/)
    const match = url.match(/\/folders\/([a-zA-Z0-9-_]+)/);
    
    if (match && match[1]) {
      currentFolderId = match[1];
      statusEl.textContent = "Ready to copy into this folder.";
      copyBtn.disabled = false;
    } else {
      statusEl.textContent = "Please navigate to a Google Drive folder first.";
      statusEl.className = 'error';
    }
  });

  // Handle the copy button click
  copyBtn.addEventListener('click', async () => {
    if (!currentFolderId) return;
    
    copyBtn.disabled = true;
    statusEl.textContent = "Copying... Please wait.";
    statusEl.className = '';

    try {
      // Build the GET request URL with query parameters
      const requestUrl = `${WEB_APP_URL}?token=${TOKEN}&destFolderId=${currentFolderId}`;
      
      const response = await fetch(requestUrl);
      const data = await response.json();

      if (data.status === 'success') {
        statusEl.textContent = "Success! The template has been copied.";
        statusEl.className = 'success';
      } else {
        statusEl.textContent = "Error: " + data.message;
        statusEl.className = 'error';
      }
    } catch (error) {
      console.error(error);
      statusEl.textContent = "Failed to connect to the Apps Script. See console for details.";
      statusEl.className = 'error';
    } finally {
      // Keep the button disabled upon success to prevent accidental double clicks, 
      // otherwise re-enable it.
      if (statusEl.className !== 'success') {
        copyBtn.disabled = false;
      }
    }
  });
});
