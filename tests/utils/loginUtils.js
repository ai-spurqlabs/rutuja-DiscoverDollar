import { authenticator } from "otplib";
import CSS from "../fixtures/Css.json" with { type: "json" };

class LoginUtils {
  constructor(page) {
    this.page = page;
  }

  async loginWithTOTP(username, password, secretKey) {
    try {
      await this.page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
      // await this.page.waitForLoadStatke('networkidle'); // Wait for page to load
      // Check if sign in with MS button is present

      console.log("Sign in with Microsoft button is visible");
      await this.page.waitForSelector("div.microsoft", { timeout: 10000 });
      await this.page.click("div.microsoft");
      console.log("Clicked Sign in with Microsoft button");

      console.log("On Microsoft login page");
      // Wait for username input to be visible
      await this.page.waitForSelector('input[name="loginfmt"]', {
        timeout: 30000,
      });
      await this.page.fill('input[name="loginfmt"]', username);
      await this.page.click('input[type="submit"]');
      await this.page.waitForTimeout(2000); // Wait for transition
      // Wait for password input to be visible
      await this.page.waitForSelector('input[name="passwd"]', {
        timeout: 30000,
      });
      await this.page.fill('input[name="passwd"]', password);
      await this.page.click('input[type="submit"]');
      await this.page.waitForTimeout(2000); // Wait for transition

      // Handle TOTP if required
      const otpInput = this.page.locator('input[name="otp"]');
      if (await otpInput.isVisible({ timeout: 10000 })) {
        const totpCode = authenticator.generate(secretKey);
        await this.page.fill('input[name="otp"]', totpCode);
        await this.page.click('input[type="submit"]');
        await this.page.waitForTimeout(2000); // Wait for transition
      }

      // Wait for redirect and verify URL
      // await this.page.waitForURL(process.env.Cantire_Stage_URL, {
      //   timeout: 30000,
      // });
      // await this.page.waitForLoadState("networkidle"); // Wait for app to load
      
      await this.page.waitForTimeout(5000);
      const backBtn = await this.page.$('#idBtn_Back', { timeout: 30000 });
      if (backBtn && await backBtn.isVisible()) {
        await this.page.click('#idBtn_Back', { timeout: 25000 });
        await this.page.waitForTimeout(5000);
      }

      return true;
    } catch (error) {
      try {
        await this.page.screenshot({ path: "login_failure.png" });
      } catch (screenshotErr) {
        console.error('Screenshot failed after login error:', screenshotErr.message);
      }
      console.error("Login failed:", error);
      return false;
    }
  }
}

export default LoginUtils;
