describe('b', () => {
  it('this test fails in CLI, and in GUI run alone, but succeeds in GUI run with whole suite', () => {
    cy.server({ force404: true });
    // note that the API request is not stubbed, so it fails with 404 unless a stub is carried over from another file

    cy.visit('/');
    cy.contains('Success');
  });
});
