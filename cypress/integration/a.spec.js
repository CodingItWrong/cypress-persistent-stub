beforeEach(() => {
  cy.server({ force404: true });

  cy.route({
    method: 'GET',
    url: 'https://sandboxapi.codingitwrong.com/posts',
    response: [],
  });
});

describe('a', () => {
  it('handles success', () => {
    cy.visit('/');
    cy.contains('Success');
  });
});
