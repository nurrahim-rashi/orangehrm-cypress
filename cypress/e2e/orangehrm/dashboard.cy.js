import LoginPage from "../../support/pages/orangehrm/LoginPage.js";
import DashboardPage from "../../support/pages/orangehrm/DashboardPage.js";

describe("OrangeHRM Dashboard Tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginRequest");

    const loginPage = new LoginPage();
    const users = {
      validUser: {
        username: "Admin",
        password: "admin123",
      },
    };

    loginPage.visit();
    loginPage.login(users.validUser.username, users.validUser.password);
    cy.wait("@loginRequest");
  });

  it("should load dashboard successfully", () => {
    const dashboardPage = new DashboardPage();
    dashboardPage.verifyDashboardLoaded();
  });

  it("should access directory menu and load employee data", () => {
    const dashboardPage = new DashboardPage();

    dashboardPage.verifyDashboardLoaded();
    cy.wait(2000);

    dashboardPage.clickDirectoryMenu();

    dashboardPage.verifyDirectoryLoaded();

    dashboardPage.elements.employeeNames().should("have.length.greaterThan", 0);
  });

  it("should search employee in directory", () => {
    const dashboardPage = new DashboardPage();

    dashboardPage.clickDirectoryMenu();
    dashboardPage.verifyDirectoryLoaded();

    dashboardPage.searchEmployee("a");

    dashboardPage.elements.employeeNames().should("be.visible");
  });
});
