// Reverse String Application JavaScript

// Function to reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Function to reverse text and update display
function reverseText() {
    const inputElement = document.getElementById('textInput');
    const resultElement = document.getElementById('resultText');

    const inputText = inputElement.value;
    const reversedText = reverseString(inputText);

    resultElement.textContent = reversedText;

    // Copy the reversed text back to the input field
    inputElement.value = reversedText;

    // Show feedback that the text was reversed and pasted back
    showReverseFeedback();
}

// Function to copy text to clipboard (generic function)
function copyReversedText(textToCopy) {
    // Use the Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopyFeedback('Reverse');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            fallbackCopyTextToClipboard(textToCopy);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(textToCopy);
    }
}

// Function to copy reversed text to clipboard
function copyText() {
    const resultElement = document.getElementById('resultText');
    const textToCopy = resultElement.textContent;
    copyReversedText(textToCopy);
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback('Copy');
        } else {
            console.error('Fallback: Could not copy text');
        }
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
    }

    document.body.removeChild(textArea);
}

// Function to show reverse feedback
function showReverseFeedback() {
    const reverseButton = document.querySelector('.btn-reverse');
    const originalText = reverseButton.innerHTML;

    reverseButton.innerHTML = 'Reversed! <svg class="icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    reverseButton.style.backgroundColor = '#28a745';

    setTimeout(() => {
        reverseButton.innerHTML = originalText;
        reverseButton.style.backgroundColor = '#007bff';
    }, 2000);
}

// Function to show copy feedback
function showCopyFeedback(buttonType = 'Copy') {
    const buttonSelector = buttonType === 'Reverse' ? '.btn-reverse' : '.btn-copy';
    const button = document.querySelector(buttonSelector);
    const originalText = button.innerHTML;

    if (buttonType === 'Reverse') {
        button.innerHTML = 'Copied! <svg class="icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        button.style.backgroundColor = '#28a745';
    } else {
        button.innerHTML = 'Copied! <svg class="icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        button.style.backgroundColor = '#28a745';
    }

    setTimeout(() => {
        button.innerHTML = originalText;
        if (buttonType === 'Reverse') {
            button.style.backgroundColor = '#007bff';
        } else {
            button.style.backgroundColor = '#6c757d';
        }
    }, 2000);
}

// Real-time text reversal as user types
document.addEventListener('DOMContentLoaded', function () {
    const inputElement = document.getElementById('textInput');
    const resultElement = document.getElementById('resultText');

    // Initial reverse on page load
    reverseText();

    // Add event listener for real-time reversal
    inputElement.addEventListener('input', function () {
        const inputText = this.value;
        const reversedText = reverseString(inputText);
        resultElement.textContent = reversedText;
    });

    // Add event listener for Enter key
    inputElement.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            reverseText();
        }
    });
});
