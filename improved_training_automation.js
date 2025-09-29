// Improved Training Video Auto-Clicker Script
// This version has better button detection and debugging

(function() {
    console.log('=== IMPROVED TRAINING AUTO-CLICKER ===');
    
    // Enhanced configuration
    const config = {
        // More comprehensive button selectors
        nextButtonSelectors: [
            // Standard button selectors
            'button[class*="next"]',
            'button[class*="Next"]', 
            'button[class*="NEXT"]',
            'input[value*="Next"]',
            'input[value*="next"]',
            'input[value*="NEXT"]',
            'a[class*="next"]',
            'a[class*="Next"]',
            'a[class*="NEXT"]',
            '.next-button',
            '.nextButton',
            '.next_button',
            '#next',
            '#nextButton',
            '#next_button',
            
            // SCORM/LMS specific selectors
            'button[onclick*="next"]',
            'button[onclick*="Next"]',
            'input[onclick*="next"]',
            'input[onclick*="Next"]',
            'a[onclick*="next"]',
            'a[onclick*="Next"]',
            
            // Generic selectors
            'button:contains("Next")',
            'button:contains("next")',
            'button:contains("NEXT")',
            'input[type="button"][value*="Next"]',
            'input[type="submit"][value*="Next"]',
            'input[type="button"][value*="next"]',
            'input[type="submit"][value*="next"]',
            
            // Video player controls
            '.video-next',
            '.player-next',
            '.media-next',
            '[data-action="next"]',
            '[data-role="next"]',
            
            // Common training platform selectors
            '.scorm-next',
            '.lms-next',
            '.course-next',
            '.lesson-next',
            '.module-next'
        ],
        checkInterval: 2000, // Check every 2 seconds
        maxWaitTime: 600000, // Stop after 10 minutes
        clickDelay: 1000, // Wait 1 second after button becomes available
        debugMode: true // Enable detailed logging
    };
    
    let startTime = Date.now();
    let clickCount = 0;
    let lastButtonFound = null;
    
    function log(message, data = null) {
        if (config.debugMode) {
            if (data) {
                console.log(`[AUTO-CLICKER] ${message}`, data);
            } else {
                console.log(`[AUTO-CLICKER] ${message}`);
            }
        }
    }
    
    function findNextButton() {
        log('Searching for Next button...');
        
        // First, try all CSS selectors
        for (let selector of config.nextButtonSelectors) {
            try {
                let elements = document.querySelectorAll(selector);
                for (let element of elements) {
                    if (element.offsetParent !== null && !element.disabled && element.style.display !== 'none') {
                        log(`Found button with selector: ${selector}`, {
                            text: element.textContent.trim(),
                            className: element.className,
                            id: element.id,
                            visible: true
                        });
                        return element;
                    }
                }
            } catch (e) {
                // Continue to next selector
            }
        }
        
        // Second, search by text content
        try {
            const allButtons = document.querySelectorAll('button, input[type="button"], input[type="submit"], a');
            for (let element of allButtons) {
                const text = element.textContent || element.value || '';
                if (text.toLowerCase().includes('next') && 
                    element.offsetParent !== null && 
                    !element.disabled &&
                    element.style.display !== 'none') {
                    log('Found button by text content', {
                        text: text.trim(),
                        tagName: element.tagName,
                        className: element.className,
                        id: element.id
                    });
                    return element;
                }
            }
        } catch (e) {
            log('Error searching by text content', e);
        }
        
        // Third, check iframe content if present
        try {
            const iframes = document.querySelectorAll('iframe');
            for (let iframe of iframes) {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc) {
                        const iframeButtons = iframeDoc.querySelectorAll('button, input[type="button"], input[type="submit"], a');
                        for (let element of iframeButtons) {
                            const text = element.textContent || element.value || '';
                            if (text.toLowerCase().includes('next') && 
                                element.offsetParent !== null && 
                                !element.disabled) {
                                log('Found button in iframe', {
                                    text: text.trim(),
                                    tagName: element.tagName,
                                    className: element.className
                                });
                                return element;
                            }
                        }
                    }
                } catch (e) {
                    // Cross-origin iframe, skip
                }
            }
        } catch (e) {
            log('Error checking iframe content', e);
        }
        
        return null;
    }
    
    function clickNextButton() {
        const button = findNextButton();
        
        if (button) {
            // Check if it's the same button as last time
            if (button === lastButtonFound) {
                log('Same button as before, might be stuck - trying different approach');
                // Try scrolling to button
                button.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            lastButtonFound = button;
            
            log('Next button found! Attempting to click...', {
                text: button.textContent || button.value,
                tagName: button.tagName,
                className: button.className
            });
            
            setTimeout(() => {
                try {
                    // Try multiple click methods
                    button.focus();
                    button.click();
                    
                    // Also try dispatching events
                    const clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        button: 0
                    });
                    button.dispatchEvent(clickEvent);
                    
                    // Try mousedown/mouseup events
                    const mouseDownEvent = new MouseEvent('mousedown', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        button: 0
                    });
                    const mouseUpEvent = new MouseEvent('mouseup', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        button: 0
                    });
                    button.dispatchEvent(mouseDownEvent);
                    button.dispatchEvent(mouseUpEvent);
                    
                    clickCount++;
                    log(`Next button clicked successfully! (Click #${clickCount})`);
                    
                } catch (error) {
                    log('Error clicking button', error);
                }
            }, config.clickDelay);
            
            return true;
        } else {
            log('No Next button found');
            return false;
        }
    }
    
    function checkForNextButton() {
        const elapsed = Date.now() - startTime;
        
        if (elapsed > config.maxWaitTime) {
            log('Auto-clicker stopped: Maximum wait time reached');
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
    log('Starting improved auto-clicker...');
    checkForNextButton();
    
    // Add debugging functions
    window.debugAutoClicker = function() {
        log('=== DEBUG INFO ===');
        log(`Elapsed time: ${Math.round((Date.now() - startTime) / 1000)}s`);
        log(`Click count: ${clickCount}`);
        log(`Last button found: ${lastButtonFound ? 'Yes' : 'No'}`);
        
        // Run the debug script
        const debugScript = document.createElement('script');
        debugScript.textContent = `
            (function() {
                console.log('=== CURRENT PAGE ANALYSIS ===');
                const buttons = document.querySelectorAll('button, input, a');
                console.log('All clickable elements:', Array.from(buttons).map(el => ({
                    tag: el.tagName,
                    text: (el.textContent || el.value || '').trim(),
                    class: el.className,
                    id: el.id,
                    visible: el.offsetParent !== null,
                    disabled: el.disabled
                })));
            })();
        `;
        document.head.appendChild(debugScript);
    };
    
    // Add a way to stop the script
    window.stopAutoClicker = function() {
        log('Auto-clicker stopped manually');
        // This will be handled by the timeout mechanism
    };
    
    log('Improved auto-clicker is running.');
    log('Type debugAutoClicker() to see current status');
    log('Type stopAutoClicker() to stop');
})();