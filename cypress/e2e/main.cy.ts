import { login, password } from '../fixtures/credentials.json';

describe('Modal window test', () => {
	it('should open modal window when ingredient is clicked', () => {
		cy.visit('http://localhost:8080');
		cy.get('[role="contentinfo"]').first().click();
		cy.get('[role="banner"]').should('be.visible');
	});
});

describe('Drag and drop test', () => {
	it('should add ingredient to constructor when dragged', () => {
		cy.visit('http://localhost:8080');
		cy.wait(500);

		cy.addIngredient(cy.get('[role="contentinfo"]').first());

		cy.getConstructor().then(($parent) => {
			cy.wrap($parent).find('.constructor-element').should('exist');
		});
	});
});

describe('Scroll to category test', () => {
	it('should scroll to selected category', () => {
		cy.visit('http://localhost:8080');

		cy.get('[role="contentinfo"]').first().trigger('dragstart');
		cy.contains('Начинки').first().click();
		cy.wait(1000);
		cy.get('[class*=ingredient-section-module__title]')
			.contains('Начинки')
			.should('be.visible');
	});
});

describe('Rearrange ingredients in constructor test', () => {
	it('should add ingredient to constructor when dragged', () => {
		cy.visit('http://localhost:8080');
		cy.wait(500);

		cy.addIngredient(cy.get('[role="contentinfo"]').first());
		cy.addIngredient(
			cy.get('[role="contentinfo"]').as('content').contains('Соус').first()
		);
		cy.addIngredient(cy.get('@content').contains('Сыр').first());

		cy.get('.constructor-element').eq(1).as('first').should('contain', 'Соус');
		cy.get('.constructor-element').eq(2).as('second').should('contain', 'Сыр');

		cy.get('@second').trigger('dragstart');
		cy.get('@first').trigger('drop');
		cy.wait(500);
		cy.get('@first').trigger('dragend');

		cy.get('.constructor-element').eq(1).should('contain', 'Сыр');
		cy.get('.constructor-element').eq(2).should('contain', 'Соус');
	});
});

describe('Login and show order modal', () => {
	it('should go to login page after creating order', () => {
		cy.makeOrder();
		cy.url().should('include', 'login');
	});

	it('should login successfully and create new order', () => {
		cy.visit('http://localhost:8080/login');
		cy.fixture('credentials.json').as('credentials');
		cy.login(login, password);

		cy.makeOrder();
		cy.wait(16000);
		cy.get('[role="banner"]').should('be.visible');
	});
});
