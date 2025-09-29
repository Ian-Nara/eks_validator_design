// Debug script to find all buttons and clickable elements on the training page
// Run this in the browser console to see what buttons are available

(function() {
    console.log('=== TRAINING BUTTON DEBUGGER ===');
    console.log('Scanning page for all buttons and clickable elements...\n');
    
    // Find all buttons
    const buttons = document.querySelectorAll('button');
    console.log(`Found ${buttons.length} button elements:`);
    buttons.forEach((btn, index) => {
        console.log(`${index + 1}. Button:`, {
            text: btn.textContent.trim(),
            className: btn.className,
            id: btn.id,
            type: btn.type,
            disabled: btn.disabled,
            visible: btn.offsetParent !== null,
            tagName: btn.tagName
        });
    });
    
    // Find all input elements
    const inputs = document.querySelectorAll('input');
    console.log(`\nFound ${inputs.length} input elements:`);
    inputs.forEach((input, index) => {
        console.log(`${index + 1}. Input:`, {
            type: input.type,
            value: input.value,
            className: input.className,
            id: input.id,
            disabled: input.disabled,
            visible: input.offsetParent !== null
        });
    });
    
    // Find all links
    const links = document.querySelectorAll('a');
    console.log(`\nFound ${links.length} link elements:`);
    links.forEach((link, index) => {
        if (link.textContent.trim() && link.textContent.trim().length < 50) {
            console.log(`${index + 1}. Link:`, {
                text: link.textContent.trim(),
                href: link.href,
                className: link.className,
                id: link.id,
                visible: link.offsetParent !== null
            });
        }
    });
    
    // Find elements with "next" in text content
    const allElements = document.querySelectorAll('*');
    const nextElements = [];
    allElements.forEach(el => {
        if (el.textContent && el.textContent.toLowerCase().includes('next') && 
            el.textContent.trim().length < 20 && el.textContent.trim().length > 0) {
            nextElements.push(el);
        }
    });
    
    console.log(`\nFound ${nextElements.length} elements containing "next":`);
    nextElements.forEach((el, index) => {
        console.log(`${index + 1}. Element:`, {
            tagName: el.tagName,
            text: el.textContent.trim(),
            className: el.className,
            id: el.id,
            visible: el.offsetParent !== null,
            clickable: el.onclick !== null || el.getAttribute('onclick')
        });
    });
    
    // Check for iframe content
    const iframes = document.querySelectorAll('iframe');
    console.log(`\nFound ${iframes.length} iframe elements:`);
    iframes.forEach((iframe, index) => {
        console.log(`${index + 1}. Iframe:`, {
            src: iframe.src,
            className: iframe.className,
            id: iframe.id,
            visible: iframe.offsetParent !== null
        });
    });
    
    console.log('\n=== END DEBUG ===');
    console.log('Look for elements that might be the Next button and note their details above.');
    console.log('If you see a likely candidate, try clicking it manually first to confirm it works.');
})();