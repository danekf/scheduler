describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    //find and click on tuesday LI from day list
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    //check css once clicked to be sure it worked
    .should("have.class", "day-list__item--selected")
  });
  
});

