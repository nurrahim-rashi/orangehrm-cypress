class ForgotPasswordPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    resetButton: () => cy.get('button[type="submit"]'),
    cancelButton: () => cy.get('button[type="button"]'),
    successMessage: () => cy.get(".oxd-text--h6"),
    errorMessage: () => cy.get(".oxd-alert-content-text"),
    validationError: () => cy.get(".oxd-input-field-error-message"),
  };

  typeUsername(username) {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  clickReset() {
    this.elements.resetButton().click();
    return this;
  }

  clickCancel() {
    this.elements.cancelButton().click();
    return this;
  }

  verifySuccessMessage() {
    this.elements.successMessage().should("contain", "successfully");
    return this;
  }

  verifyErrorMessage(message) {
    this.elements.errorMessage().should("contain", message);
    return this;
  }

  verifyValidationError() {
    this.elements.validationError().should("be.visible");
    return this;
  }

  verifyPageLoaded() {
    cy.url().should("include", "/requestPasswordResetCode");
    cy.contains("Reset Password").should("be.visible");
    return this;
  }
}

export default ForgotPasswordPage;
