class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    forgotPasswordLink: () => cy.get(".orangehrm-login-forgot"),
    errorMessage: () => cy.get(".oxd-alert-content-text"),
    loginForm: () => cy.get(".orangehrm-login-form"),
  };

  visit() {
    cy.visit("/web/index.php/auth/login");
    return this;
  }

  typeUsername(username) {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  typePassword(password) {
    this.elements.passwordInput().clear().type(password);
    return this;
  }

  clickLogin() {
    this.elements.loginButton().click();
    return this;
  }

  clickForgotPassword() {
    this.elements.forgotPasswordLink().click();
    return this;
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  verifyErrorMessage(message) {
    this.elements.errorMessage().should("contain", message);
    return this;
  }

  verifyLoginFormVisible() {
    this.elements.loginForm().should("be.visible");
    return this;
  }

  verifyPageLoaded() {
    cy.url().should("include", "/auth/login");
    cy.contains("Login", { timeout: 10000 }).should("be.visible");
    return this;
  }
}

export default LoginPage;
