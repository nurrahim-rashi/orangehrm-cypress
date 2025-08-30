class DashboardPage {
  elements = {
    dashboardHeader: () => cy.get(".oxd-topbar-header-breadcrumb-module"),
    directoryMenu: () => cy.get("nav").contains("Directory").first(),
    employeeCards: () => cy.get(".orangehrm-directory-card"),
    employeeNames: () => cy.get(".orangehrm-directory-card-header"),
    searchInput: () => cy.get('input[placeholder="Search"]'),
    searchButton: () => cy.get('button[type="submit"]'),
  };

  verifyDashboardLoaded() {
    this.elements.dashboardHeader().should("contain", "Dashboard");
  }

  clickDirectoryMenu() {
    this.elements.directoryMenu().click({ force: true });
    cy.url().should("include", "/directory/viewDirectory");
  }

  verifyDirectoryLoaded() {
    cy.url().should("include", "/directory/viewDirectory");
    this.elements.employeeCards().should("be.visible");
  }

  searchEmployee(name) {
    this.elements.searchInput().clear().type(name);
    this.elements.searchButton().click();
    cy.wait(2000);
  }

  verifyEmployeeVisible(name) {
    this.elements
      .employeeNames()
      .contains(name, { matchCase: false })
      .should("be.visible");
  }
}

export default DashboardPage;
