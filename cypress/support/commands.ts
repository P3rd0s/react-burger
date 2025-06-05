import Chainable = Cypress.Chainable;

export {};

Cypress.Commands.add('login', (email: string, password: string) => {
	cy.get('.input_type_email').type(email);
	cy.get('.input_type_password').type(password);

	cy.get('[type="submit"]').click();
	cy.wait(500);
});

Cypress.Commands.add('getConstructor', () => {
	return cy.get('[class*="burger-constructor-module__wrapper"]');
});

Cypress.Commands.add(
	'addIngredient',
	(ingredient: Chainable<JQuery<HTMLElement>>) => {
		ingredient.trigger('dragstart');
		cy.getConstructor().trigger('drop');
		cy.wait(500);
		cy.getConstructor().trigger('dragend');
	}
);

Cypress.Commands.add('makeOrder', () => {
	cy.visit('http://localhost:8080');
	cy.wait(500);

	cy.addIngredient(cy.get('[role="contentinfo"]').first());
	cy.addIngredient(cy.get('[role="contentinfo"]').contains('Соус').first());

	cy.contains('Оформить заказ').click();
});

declare global {
	namespace Cypress {
		interface Chainable {
			login(email: string, password: string): Chainable<void>;
			getConstructor(): Chainable<JQuery<HTMLElement>>;
			addIngredient(
				ingredient: Chainable<JQuery<HTMLElement>>
			): Chainable<void>;
			makeOrder(): Chainable<void>;
		}
	}
}
