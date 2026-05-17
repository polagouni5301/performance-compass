from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # 1. Start at landing page
    print("Navigating to landing page...")
    page.goto("http://localhost:8080/landing")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/landing.png")

    # 2. Click Launch to go to Hub
    print("Clicking Launch...")
    page.get_by_role("link", name="Launch").first.click()
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/hub.png")

    # 3. Click "CAP & PIP Management" (Open Tool)
    print("Opening CAP & PIP Management tool...")
    # The link is a group, we can click the "Open Tool" button inside it
    page.get_by_role("link", name="CAP & PIP Management").get_by_text("Open Tool").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/supervisor_home.png")

    # 4. Test Persona Switcher in AppShell
    print("Switching persona to Agent...")
    page.get_by_role("button", name="Supervisor Alex Johnson").click()
    page.wait_for_timeout(500)
    page.get_by_role("menuitem", name="Agent").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/persona_switched_agent.png")

    # 5. Navigate via Sidebar
    print("Navigating to My PIP...")
    page.get_by_role("link", name="My PIP").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/agent_pip.png")

    # 6. Go to Audit
    print("Navigating to Audit dashboard...")
    page.get_by_role("link", name="Audit dashboard").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/audit_dashboard.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/screenshots/error.png")
        finally:
            context.close()
            browser.close()
