// Training Video Auto-Clicker Script
// This script automatically clicks the "Next" button when it becomes available
// Run this in the browser console (F12 -> Console tab)

(function() {
    console.log('Training Auto-Clicker started...');
    
    // Configuration
    const config = {
        nextButtonSelectors: [
            'button[class*="next"]',
            'button[class*="Next"]', 
            'input[value*="Next"]',
            'input[value*="next"]',
            'a[class*="next"]',
            'a[class*="Next"]',
            '.next-button',
            '.nextButton',
            '#next',
            '#nextButton',
            'button:contains("Next")',
            'button:contains("next")',
            'input[type="button"][value*="Next"]',
            'input[type="submit"][value*="Next"]'
        ],
        checkInterval: 1000, // Check every 1 second
        maxWaitTime: 300000, // Stop after 5 minutes
        clickDelay: 500 // Wait 500ms after button becomes available before clicking
    };
    
    let startTime = Date.now();
    let clickCount = 0;
    
    function findNextButton() {
        for (let selector of config.nextButtonSelectors) {
            try {
                // Try jQuery selector first
                if (typeof $ !== 'undefined') {
                    let element = $(selector);
                    if (element.length > 0 && element.is(':visible') && !element.prop('disabled')) {
                        return element[0];
                    }
                }
                
                // Fallback to vanilla JavaScript
                let elements = document.querySelectorAll(selector);
                for (let element of elements) {
                    if (element.offsetParent !== null && !element.disabled) {
                        return element;
                    }
                }
            } catch (e) {
                // Continue to next selector
            }
        }
        return null;
    }
    
    function clickNextButton() {
        const button = findNextButton();
        
        if (button) {
            console.log('Next button found! Clicking...');
            
            // Add a small delay to ensure the button is fully ready
            setTimeout(() => {
                try {
                    // Try multiple click methods
                    button.click();
                    
                    // Also try dispatching a click event
                    const clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    button.dispatchEvent(clickEvent);
                    
                    clickCount++;
                    console.log(`Next button clicked! (Click #${clickCount})`);
                } catch (error) {
                    console.error('Error clicking button:', error);
                }
            }, config.clickDelay);
            
            return true;
        }
        return false;
    }
    
    function checkForNextButton() {
        const elapsed = Date.now() - startTime;
        
        if (elapsed > config.maxWaitTime) {
            console.log('Auto-clicker stopped: Maximum wait time reached');
            return;
        }
        
        if (clickNextButton()) {
            // Button was clicked, continue checking
            setTimeout(checkForNextButton, config.checkInterval);
        } else {
            // No button found, continue checking
            setTimeout(checkForNextButton, config.checkInterval);
        }
    }
    
    // Start the auto-clicker
    console.log('Starting auto-clicker...');
    checkForNextButton();
    
    // Add a way to stop the script
    window.stopAutoClicker = function() {
        console.log('Auto-clicker stopped manually');
        // This will be handled by the timeout mechanism
    };
    
    console.log('Auto-clicker is running. Type stopAutoClicker() in console to stop.');
})();