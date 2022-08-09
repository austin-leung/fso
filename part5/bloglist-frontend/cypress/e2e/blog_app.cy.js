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
      cy.get('html').should('not.contain', 'Spongebob Squarepants logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'bikinibigboy', password: 'secret' })
    })

    it('can create a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('my title')
      cy.get('#author').type('my author')
      cy.get('#url').type('my url')

      cy.get('#submit-button').click()

      cy.contains('my title')
      cy.contains('my author')
      cy.contains('my url')
    })

    it.only('can like a blog', () => {
      cy.createBlog({ title: 'my title', author: 'my author', url: 'my url' })
      cy.createBlog({ title: 'my title2', author: 'my author2', url: 'my url2' })
      cy.createBlog({ title: 'my title3', author: 'my author3', url: 'my url3' })


      cy.contains('my title2').parent().as('secondParent')
      cy.get('@secondParent').find('button').contains('view').click() // view
      cy.get('@secondParent').should('contain', 0)
      cy.get('@secondParent').find('button').contains('like').click()
      cy.get('@secondParent').should('contain', 1)
    })

  })
})

