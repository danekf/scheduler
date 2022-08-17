
describe("Appointments", () =>{
  //reset db between tests
  beforeEach( () =>{
    cy.request("GET", "/api/debug/reset")

    //load page
    cy.visit("/");
    //ensure page is loaded by making sure MONDAY is there
    cy.contains("Monday");

  });

  it("Should book an interview", () =>{  
    //find add button by alt text and click the first appointment open for the day
    cy.get("[alt=Add]")
      .first()
      .click();

    //find the input field by testid, and type a test name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    //ensure that the typed name is there
    // cy.contains("[data-testid=student-name-input]", "Lydia Miller-Jones");
   
    //click on the first available interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    //click on save button
    cy.contains("Save").click();

    //ensure that appointment saved properly
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("Should edit an interview", ()=>{
    //find element with interview for specific name
    cy.contains(".appointment__card--show", "Archie Cohen");
        
    //get edit button and click it by force since it is not visible, even with mouse over within cypress
    cy.get("[alt=Edit").click({force: true});

    //edit student name
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    //select different interviewer
    cy.get("[alt='Tori Malcolm']").click();
    //save
    cy.contains("Save").click();

    //confirm save 
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");


  });

});