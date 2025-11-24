describe("Mini CRM Dashboard", () => {
it("lädt Kundenliste und zeigt Details an", () => {
cy.visit("index.html");
cy.get("[data-cy=customer-table]").should("exist");
cy.get("[data-cy^=customer-row-]").first().click();
cy.get("[data-cy=detail-panel]").should("exist");
});

it("filtert Kundenliste per Suchfeld", () => {
cy.visit("index.html");
cy.get("[data-cy=search-input]").type("Leanne");
cy.get("[data-cy^=customer-row-]").should("have.length.at.least", 1);
});

it("legt neuen Kunden an", () => {
cy.visit("index.html");
cy.get("[data-cy=add-customer-button]").click();
cy.get("[data-cy=form-panel]").should("exist");
cy.get("[data-cy=form-name]").type("Test Kunde");
cy.get("[data-cy=form-company]").type("Test Firma");
cy.get("[data-cy=form-email]").type("test@example.com");
cy.get("[data-cy=form-submit]").click();
cy.get("[data-cy=detail-panel]").contains("Test Kunde");
});

it("bearbeitet bestehenden Kunden", () => {
cy.visit("index.html");
cy.get("[data-cy^=customer-row-]").first().click();
cy.get("[data-cy=edit-button]").click();
cy.get("[data-cy=form-name]").clear().type("Geänderter Name");
cy.get("[data-cy=form-submit]").click();
cy.get("[data-cy=detail-panel]").contains("Geänderter Name");
});

it("löscht Kunden aus der Liste", () => {
cy.visit("index.html");
cy.get("[data-cy^=customer-row-]").then(rows => {
const initialCount = rows.length;
if (initialCount === 0) {
return;
}
cy.wrap(rows.first()).click();
cy.get("[data-cy=delete-button]").click();
cy.get("[data-cy^=customer-row-]").should("have.length.lessThan", initialCount);
});
});
});
