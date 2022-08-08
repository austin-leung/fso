describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Spongebob Squarepants',
      username: 'bikinibigboy',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('bikinibigboy')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Spongebob Squarepants logged in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('bikinibigboy')
      cy.get('#password').type('plankton')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
    })
  })
})