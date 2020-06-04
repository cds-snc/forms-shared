/*
https://medium.com/norwich-node-user-group/visual-regression-testing-with-cypress-io-and-cypress-image-snapshot-99c520ccc595
*/

const screenHeight = 1200;

const sizes = [
  [640, screenHeight],
  [768, screenHeight],
  [1024, screenHeight],
  [1280, screenHeight],
  [1920, screenHeight],
];

const pages = [
  "textfield",
  "textarea",
  "radio",
  "checkbox",
  "select",
  "errorbox",
  "button",
];

describe("Visual regression tests", () => {
  sizes.forEach((size) => {
    pages.forEach((page) => {
      it(`Should match previous screenshot '${page} page' when '${size}'`, () => {
        cy.setResolution(size);
        cy.visit(`/${page}`);
        cy.matchImageSnapshot();
      });
    });
  });
});
