describe('App E2E', () => {
	beforeEach(() => {
		cy.visit('/');

		cy.get('span[data-testid="clearCompleted"').click();
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

		cy.get('div[data-testid="content"] li').should('have.length', 3);

		cy.get('div[data-testid="content"] li:last-child button')
			.invoke('show')
			.click();
		cy.get('div[data-testid="content"] li').should('have.length', 2);
	});

	it('should show all item when click All', () => {
		cy.get('div[data-testid="content"]')
			.find('li')
			.then((li) => {
				const liCount: number = Cypress.$(li).length;
				cy.get('span[data-testid="getAll"]').click();

				cy.get('div[data-testid="content"]')
					.find('li')
					.its('length')
					.should('eq', liCount);
			});
	});

	it('should show all active items when click Active', () => {
		cy.get('input[type="text"]').type('Some Completed todo');
		cy.get('div[data-testid="inputContainer"]')
			.find('div[data-testid="checkBoxContainer"]')
			.click();
		cy.get('button[type=submit]').click();

		cy.get('div[data-testid="content"]')
			.find('li')
			.then((li) => {
				const liCount: number = Cypress.$(li).length;
				cy.get('span[data-testid="getActive"]').click();

				cy.get('div[data-testid="content"]')
					.find('li')
					.its('length')
					.should('eq', liCount - 1);
			});
	});

	it('should show all completed items when click Completed', () => {
		cy.get('input[type="text"]').type('Some Completed todo');
		cy.get('div[data-testid="inputContainer"]')
			.find('div[data-testid="checkBoxContainer"]')
			.click();
		cy.get('button[type=submit]').click();

		cy.get('span[data-testid="getCompleted"]').click();
		cy.get('div[data-testid="content"]').find('li').should('have.length', 1);
	});

	it('clear completed should remove', () => {
		cy.get('input[type="text"]').type('Some Completed todo');
		cy.get('div[data-testid="inputContainer"]')
			.find('div[data-testid="checkBoxContainer"]')
			.click();
		cy.get('button[type=submit]').click();

		cy.get('div[data-testid="content"]')
			.find('li')
			.then((li) => {
				const liCount: number = Cypress.$(li).length;

				cy.get('span[data-testid="clearCompleted"').click();
				cy.get('div[data-testid="content"]')
					.find('li')
					.its('length')
					.should('eq', liCount - 1);
			});
	});
});
