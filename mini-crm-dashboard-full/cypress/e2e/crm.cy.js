describe("Mini CRM Dashboard", () => {
it("lädt Kundenliste und zeigt Details an", () => {
cy.visit("index.html");
cy.contains("Mini CRM Dashboard");
cy.get("table").should("exist");
});

it("filtert Kundenliste per Suchfeld", () => {
cy.visit("index.html");
cy.get(".crm-search-input").type("Musterkunde Eins");
cy.get("tbody tr").first().contains("Musterkunde Eins");
});

it("legt neuen Kunden an", () => {
cy.visit("index.html");
cy.contains("Neuer Kunde").click();
cy.get(".crm-form-card").should("exist");
cy.get("input[type=text]").first().type("Neuer Musterkunde");
cy.get("input[type=text]").eq(1).type("Neue Musterfirma");
cy.get("input[type=email]").type("neu@example.com");
cy.contains("Speichern").click();
cy.contains("Neuer Musterkunde");
});
});
