describe("Member Registration Form Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("loads without errors", () => {
    cy.get("h2").should("have.text", "Member Registration Form");
  });
  it("displays 4 inputs and 1 button areas", () => {
    cy.get("input").should("have.length", 4);
    cy.get("button").should("have.length", 1);
  });
  it("button is disabled", () => {
    cy.get("button[type='submit']").should("be.disabled");
  });

  const validMember = {
    name: "Dobby",
    email: "dobby@dobby.com",
    password: "Dobby.123",
    terms: true,
  };

  it("valid member values are shown and no error messages", () => {
    cy.get("input[name='name']")
      .type(validMember.name)
      .should("have.value", validMember.name);

    cy.get("input[name='email']")
      .type(validMember.email)
      .should("have.value", validMember.email);

    cy.get("input[name='password']")
      .type(validMember.password)
      .should("have.value", validMember.password);

    cy.get("input[name='terms']").check().should("be.checked");

    cy.get("[data-cy='error']").should("have.length", 0);
    cy.get("[data-cy='error']").should("not.exist");
    cy.get("button[type='submit']").should("be.enabled");
  });

  it("Sign up test when valid member values entered", () => {
    cy.get("input[name='name']").type(validMember.name);

    cy.get("input[name='email']").type(validMember.email);

    cy.get("input[name='password']").type(validMember.password);

    cy.get("input[name='terms']").check().should("be.checked");

    cy.get("button[type='submit']").click();

    cy.get("[data-cy='memberList']").should("exist");
    cy.get("[data-cy='memberList']").should("have.length", 1);
    cy.get("[data-cy='memberList']").should("contain.text", validMember.name);
  });

  const invalidMember = {
    name: "Do",
    email: "dobbydobby.com",
    password1: "12345678",
    password2: "Dobby.1",
    password3: "dobby.123",
    password4: "Dobby123",
    password5: "Dobbydobby",
    terms: false,
  };

  it("shows an error message and disables the button when invalid name entered", () => {
    cy.get("input[name='name']").type(invalidMember.name);
    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "Must be at least 3 characters long."
    );
    cy.get("button[type='submit']").should("be.disabled");
    cy.get("input[name='name']").clear();
    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should("have.text", "Must include name.");
    cy.get("button[type='submit']").should("be.disabled");
  });
  it("shows error message and disables the button when invalid email entered", () => {
    cy.get("input[name='email']").type(invalidMember.email);

    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "Must be a valid email address."
    );
    cy.get("button[type='submit']").should("be.disabled");
    cy.get("input[name='email']").clear();
    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "Must include email address."
    );
    cy.get("button[type='submit']").should("be.disabled");
  });
  it("shows an error message and disables the button when invalid password entered", () => {
    cy.get("input[name='password']").type(invalidMember.password1);

    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "Must include uppercase, lowercase, number, symbol and must be at least 8 chars long."
    );
    cy.get("button[type='submit']").should("be.disabled");

    cy.get("input[name='password']").clear();
    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should("have.text", "Password is Required");
    cy.get("button[type='submit']").should("be.disabled");

    cy.get("input[name='password']").clear();

    cy.get("input[name='password']").type(invalidMember.password2);
    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "Must include uppercase, lowercase, number, symbol and must be at least 8 chars long."
    );
    cy.get("input[name='password']").clear();
    cy.get("input[name='password']").type(invalidMember.password3);
    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "Must include uppercase, lowercase, number, symbol and must be at least 8 chars long."
    );
    cy.get("input[name='password']").clear();
    cy.get("input[name='password']").type(invalidMember.password4);
    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "Must include uppercase, lowercase, number, symbol and must be at least 8 chars long."
    );
    cy.get("input[name='password']").clear();
    cy.get("input[name='password']").type(invalidMember.password5);
    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "Must include uppercase, lowercase, number, symbol and must be at least 8 chars long."
    );
  });

  it("shows an error message and disables the button when checkbox is checked and unchecked, respectively.", () => {
    cy.get("input[name='terms']")
      .check()
      .should("be.checked")
      .uncheck()
      .should("not.be.checked");

    cy.get("button[type='submit']").should("be.disabled");

    cy.get("[data-cy='error']").should("have.length", 1);
    cy.get("[data-cy='error']").should(
      "have.text",
      "You must read and agree to the Terms and Conditions"
    );
  });
});
