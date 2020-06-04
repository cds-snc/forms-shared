/*
https://medium.com/norwich-node-user-group/visual-regression-testing-with-cypress-io-and-cypress-image-snapshot-99c520ccc595
*/

describe("Textfield regression tests", () => {
  it('Should match previous screenshot', () => {
    cy.visit("/textfield");
    cy.matchImageSnapshot();
  });
});
