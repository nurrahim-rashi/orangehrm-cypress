const LoginPage = require("../support/pages/orangehrm/LoginPage.js");
const ForgotPasswordPage = require("../support/pages/orangehrm/ForgotPasswordPage.js");
const DashboardPage = require("../support/pages/orangehrm/DashboardPage.js");

Cypress.Commands.add("login", (username, password) => {
  const loginPage = new LoginPage();
  loginPage.visit();
  loginPage.login(username, password);
});

Cypress.Commands.add("interceptLogin", () => {
  cy.intercept("POST", "/web/index.php/auth/validate").as("loginRequest");
});

Cypress.Commands.add("interceptForgotPassword", () => {
  cy.intercept("POST", "/web/index.php/auth/sendPasswordReset").as(
    "forgotPasswordRequest"
  );
});

Cypress.Commands.add("interceptDirectoryData", () => {
  cy.intercept("GET", "/web/index.php/api/v2/directory/employees**").as(
    "directoryDataRequest"
  );
});

Cypress.Commands.add("getLoginPage", () => {
  return new LoginPage();
});

Cypress.Commands.add("getForgotPasswordPage", () => {
  return new ForgotPasswordPage();
});

Cypress.Commands.add("getDashboardPage", () => {
  return new DashboardPage();
});
