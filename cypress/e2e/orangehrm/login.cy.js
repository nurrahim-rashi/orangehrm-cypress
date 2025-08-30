import LoginPage from "../../support/pages/orangehrm/LoginPage.js";
import DashboardPage from "../../support/pages/orangehrm/DashboardPage.js";
import ForgotPasswordPage from "../../support/pages/orangehrm/ForgotPasswordPage.js";

describe("OrangeHRM Login Tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginRequest");
    const loginPage = new LoginPage();
    loginPage.visit();
  });

  it("should login successfully with valid credentials", () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const users = {
      validUser: {
        username: "Admin",
        password: "admin123",
      },
    };

    loginPage.login(users.validUser.username, users.validUser.password);

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(302);
    });

    dashboardPage.verifyDashboardLoaded();
  });

  it("should show error message with invalid credentials", () => {
    const loginPage = new LoginPage();
    const users = {
      invalidUser: {
        username: "invalid",
        password: "invalid123",
      },
    };

    loginPage.login(users.invalidUser.username, users.invalidUser.password);

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(302);
    });

    loginPage.verifyErrorMessage("Invalid credentials");
  });

  it("should navigate to forgot password page", () => {
    const loginPage = new LoginPage();
    loginPage.clickForgotPassword();
    cy.url().should("include", "/auth/requestPasswordResetCode");
  });
});
