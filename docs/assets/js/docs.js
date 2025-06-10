// Copy functionality for code blocks
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            // Find the closest code block
            const codeBlock = button.closest('.code-block');
            const code = codeBlock.querySelector('code');

            try {
                // Get the text content without extra spaces and line numbers
                const textToCopy = code.textContent
                    .replace(/^\s+|\s+$/g, '') // Remove leading/trailing whitespace
                    .replace(/\n\s+/g, '\n'); // Remove extra spaces at start of lines

                // Copy to clipboard
                await navigator.clipboard.writeText(textToCopy);

                // Update button state
                button.textContent = 'Copied!';
                button.classList.add('copied');

                // Reset button after 2 seconds
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);

            } catch (err) {
                console.error('Failed to copy:', err);
                button.textContent = 'Error!';
                button.classList.add('error');

                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('error');
                }, 2000);
            }
        });
    });
});
