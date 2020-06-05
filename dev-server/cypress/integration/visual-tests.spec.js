/*
https://medium.com/norwich-node-user-group/visual-regression-testing-with-cypress-io-and-cypress-image-snapshot-99c520ccc595
https://github.com/cypress-io/cypress/issues/3324
https://docs.cypress.io/api/commands/viewport.html#Arguments

Clock
https://docs.cypress.io/guides/tooling/visual-testing.html#Timestamps
*/
import { onlyOn } from "@cypress/skip-test";
const sizes = ["iphone-6", "ipad-2", "macbook-13", "macbook-15"];

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
      onlyOn("headless", () => {
        it(`it should render "${page}" on "${size}" screen'`, () => {
          cy.setResolution(size);
          cy.visit(`/${page}`);
          cy.matchImageSnapshot();
        }); //
      });
    });
  });
});
