describe('App E2E', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('should visit app with empty input', () => {
		cy.get('input[type="text"]').should('have.value', '');
	});

	it('should add todo', () => {
		cy.get('input[type="text"]').type('Some todo 1');
		cy.get('button[type=submit]').click();

		cy.get('li:last-child p').should('have.text', 'Some todo 1');
	});

	it('should have add button disabled if text empty', () => {
		cy.get('input[type="text"]').clear();

		cy.get('button[type=submit]').should('be.disabled');
	});

	it('should remove item', () => {
		cy.get('input[type="text"]').type('Some todo 2');
		cy.get('button[type=submit]').click();

		cy.get('#content li').should('have.length', 3);

		cy.get('#content li:last-child button').invoke('show').click();
		//cy.get('li:last-child button').click();
		cy.get('#content li').should('have.length', 2);
	});
});
