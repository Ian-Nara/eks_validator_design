# Training Video Auto-Clicker

This tool helps automate clicking the "Next" button on training videos you've already watched, so you can quickly navigate through content you've already completed.

## Method 1: Browser Console Script (Easiest)

### Steps:
1. Open your training in Chrome/Firefox
2. Press `F12` to open Developer Tools
3. Go to the "Console" tab
4. Copy and paste the entire contents of `training_automation.js` into the console
5. Press Enter to run the script

### Features:
- Automatically detects and clicks "Next" buttons
- Works with various button types and styles
- Logs activity to console
- Can be stopped by typing `stopAutoClicker()` in console

## Method 2: Python Selenium Script (More Control)

### Prerequisites:
```bash
pip install selenium
```

You'll also need ChromeDriver:
- Download from: https://chromedriver.chromium.org/
- Make sure it matches your Chrome version
- Add to your PATH or place in the same folder as the script

### Usage:
```bash
python training_automation_python.py
```

### Features:
- Can run in headless mode (no browser window)
- Configurable maximum clicks
- Better error handling
- Can be customized for specific training systems

## Method 3: Browser Extension (Most Convenient)

Create a simple browser extension:

1. Create a folder called `training-autoclicker`
2. Create `manifest.json`:
```json
{
  "manifest_version": 3,
  "name": "Training Auto-Clicker",
  "version": "1.0",
  "permissions": ["activeTab"],
  "action": {
    "default_popup": "popup.html"
  },
  "content_scripts": [{
    "matches": ["*://*/*"],
    "js": ["content.js"]
  }]
}
```

3. Create `popup.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Training Auto-Clicker</title>
</head>
<body>
  <button id="start">Start Auto-Click</button>
  <button id="stop">Stop Auto-Click</button>
  <script src="popup.js"></script>
</body>
</html>
```

4. Create `content.js` with the JavaScript code from Method 1
5. Load the extension in Chrome: Extensions → Developer mode → Load unpacked

## Important Notes:

### ⚠️ Use Responsibly:
- Only use this for content you've already watched
- You'll still need to take any tests manually
- Keep records of your completion in case of issues
- Be prepared to explain your approach if questioned

### 🔧 Troubleshooting:
- If the script doesn't find buttons, the training system might use non-standard elements
- Try inspecting the page (F12 → Elements) to find the actual button selectors
- Some training systems have anti-automation measures
- The script includes multiple button detection methods

### 📝 Customization:
- Modify the `nextButtonSelectors` array to add more button detection patterns
- Adjust timing with `checkInterval` and `clickDelay`
- Add specific selectors for your training system

## Legal Disclaimer:
This tool is for educational purposes and should only be used for content you have already completed. Always follow your company's training policies and employment agreements.