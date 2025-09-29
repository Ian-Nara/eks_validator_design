#!/usr/bin/env python3
"""
Training Video Auto-Clicker using Selenium
This script automatically clicks the "Next" button when it becomes available
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time
import sys

class TrainingAutoClicker:
    def __init__(self, headless=False):
        self.driver = None
        self.setup_driver(headless)
        
    def setup_driver(self, headless=False):
        """Setup Chrome driver with options"""
        chrome_options = Options()
        if headless:
            chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            print("Chrome driver initialized successfully")
        except Exception as e:
            print(f"Error initializing Chrome driver: {e}")
            print("Make sure you have Chrome and chromedriver installed")
            sys.exit(1)
    
    def find_next_button(self):
        """Find the Next button using multiple selectors"""
        next_button_selectors = [
            "button[class*='next']",
            "button[class*='Next']",
            "input[value*='Next']",
            "input[value*='next']",
            "a[class*='next']",
            "a[class*='Next']",
            ".next-button",
            ".nextButton",
            "#next",
            "#nextButton",
            "input[type='button'][value*='Next']",
            "input[type='submit'][value*='Next']"
        ]
        
        for selector in next_button_selectors:
            try:
                elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                for element in elements:
                    if element.is_displayed() and element.is_enabled():
                        return element
            except:
                continue
        
        # Try finding by text content
        try:
            buttons = self.driver.find_elements(By.TAG_NAME, "button")
            for button in buttons:
                if "next" in button.text.lower() and button.is_displayed() and button.is_enabled():
                    return button
        except:
            pass
            
        return None
    
    def wait_and_click_next(self, timeout=30):
        """Wait for Next button to be available and click it"""
        try:
            wait = WebDriverWait(self.driver, timeout)
            
            # Wait for any Next button to be clickable
            next_button = wait.until(
                lambda driver: self.find_next_button()
            )
            
            if next_button:
                print("Next button found! Clicking...")
                next_button.click()
                print("Next button clicked successfully!")
                return True
                
        except TimeoutException:
            print(f"No Next button found within {timeout} seconds")
            return False
        except Exception as e:
            print(f"Error clicking Next button: {e}")
            return False
    
    def auto_click_loop(self, max_clicks=50, delay_between_checks=2):
        """Continuously look for and click Next buttons"""
        click_count = 0
        
        print(f"Starting auto-click loop (max {max_clicks} clicks)...")
        
        while click_count < max_clicks:
            try:
                if self.wait_and_click_next(timeout=5):
                    click_count += 1
                    print(f"Click #{click_count} completed")
                    time.sleep(delay_between_checks)
                else:
                    print("No Next button found, waiting...")
                    time.sleep(delay_between_checks)
                    
            except KeyboardInterrupt:
                print("\nAuto-clicker stopped by user")
                break
            except Exception as e:
                print(f"Error in auto-click loop: {e}")
                time.sleep(delay_between_checks)
        
        print(f"Auto-clicker finished. Total clicks: {click_count}")
    
    def navigate_to_training(self, url):
        """Navigate to the training URL"""
        try:
            print(f"Navigating to: {url}")
            self.driver.get(url)
            print("Page loaded successfully")
            return True
        except Exception as e:
            print(f"Error navigating to URL: {e}")
            return False
    
    def close(self):
        """Close the browser"""
        if self.driver:
            self.driver.quit()
            print("Browser closed")

def main():
    # Training URL from your message
    training_url = "https://cdn1.navexglobal.com/courseware/standard/navexglobal/rcp/index.html?configDoc=../wph10_custom/thetradedesk_empfund/thetradedesk_empfund_emp_fund_acp_config.xml&setting=../wph8_custom/_navex&AICC_SID=e3023037-2029-4c3e-bd1f-7bc51eacddc3EngineTenantName%257Cthetradedesk&AICC_URL=https://wd5-media.myworkdaycdn.com/scorm/ScormEngineInterface/ProcessAiccRequest.jsp%3Ftracking%3Dtrue%26forceReview%3Dfalse"
    
    print("Training Auto-Clicker")
    print("===================")
    
    # Ask user for preferences
    headless = input("Run in headless mode? (y/n): ").lower().startswith('y')
    max_clicks = int(input("Maximum number of clicks (default 50): ") or "50")
    
    # Initialize auto-clicker
    auto_clicker = TrainingAutoClicker(headless=headless)
    
    try:
        # Navigate to training
        if auto_clicker.navigate_to_training(training_url):
            print("\nPress Ctrl+C to stop the auto-clicker at any time")
            input("Press Enter to start auto-clicking...")
            
            # Start auto-clicking
            auto_clicker.auto_click_loop(max_clicks=max_clicks)
        else:
            print("Failed to navigate to training URL")
            
    except KeyboardInterrupt:
        print("\nAuto-clicker stopped by user")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        auto_clicker.close()

if __name__ == "__main__":
    main()