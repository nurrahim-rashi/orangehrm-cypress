import LoginPage from "../../support/pages/orangehrm/LoginPage.js";
import ForgotPasswordPage from "../../support/pages/orangehrm/ForgotPasswordPage.js";

describe("OrangeHRM Forgot Password Tests", () => {
  beforeEach(() => {
    const loginPage = new LoginPage();
    loginPage.visit();
    loginPage.clickForgotPassword();
  });

  it("should show forgot password form correctly", () => {
    const forgotPasswordPage = new ForgotPasswordPage();

    forgotPasswordPage.verifyPageLoaded();

    forgotPasswordPage.elements.usernameInput().should("be.visible");
    forgotPasswordPage.elements.resetButton().should("be.visible");
    forgotPasswordPage.elements.cancelButton().should("be.visible");

    cy.contains("Reset Password").should("be.visible");
  });

  it("should allow entering username and show success UI", () => {
    const forgotPasswordPage = new ForgotPasswordPage();

    forgotPasswordPage.typeUsername("Admin");
    forgotPasswordPage.clickReset();

    cy.contains("Reset Password link sent successfully", {
      timeout: 10000,
    }).should("be.visible");

    cy.get(".oxd-text--h6").should("contain", "successfully");
  });

  it("should cancel and return to login page", () => {
    const forgotPasswordPage = new ForgotPasswordPage();
    const loginPage = new LoginPage();

    forgotPasswordPage.clickCancel();

    loginPage.verifyLoginFormVisible();
    loginPage.verifyPageLoaded();
    cy.url().should("include", "/auth/login");
  });

  it("should handle empty username submission", () => {
    const forgotPasswordPage = new ForgotPasswordPage();

    forgotPasswordPage.clickReset();

    cy.contains("Required", { timeout: 5000 }).should("be.visible");
  });

  it("should handle non-existent username gracefully", () => {
    const forgotPasswordPage = new ForgotPasswordPage();

    forgotPasswordPage.typeUsername("nonexistentuser12345");
    forgotPasswordPage.clickReset();

    cy.contains("Reset Password link sent successfully", {
      timeout: 10000,
    }).should("be.visible");
  });
});
