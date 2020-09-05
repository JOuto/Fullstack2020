describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: 'Jouni Toni',
      username: 'jtoni',
      password: 'kukka'
    }
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#user");
    cy.get("#pass");
    cy.get("#login");
  });
});
describe('Login', function () {

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: 'Jouni Toni',
      username: 'jtoni',
      password: 'kukka'
    }
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it('succeeds with correct credentials', function () {
    cy.get("#user").type('jtoni');
    cy.get("#pass").type('kukka');
    cy.get('#login').click();
    cy.contains("Jouni Toni logged in")


  })

  it('fails with wrong credentials', function () {
    cy.get("#user").type('jtoni');
    cy.get("#pass").type('kaka');
    cy.get('#login').click();
    cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(0, 0, 255)')
      .and('have.css', 'border-style', 'solid')
  })
})
describe('When logged in', function () {

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: 'Jouni Toni',
      username: 'jtoni',
      password: 'kukka'
    }
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");

    cy.login({ username: "jtoni", password: "kukka" })

  })

  it('A blog can be created', function () {

    cy.contains("blog").click();
    //cy.createBlog({ title: "test1", author: "test2", url: "test3", likes: 0 })
    cy.get("#eka").type('testTitle');
    cy.get("#toka").type('testAuthor');
    cy.get("#kolmas").type('testUrl');
    cy.get("#submit").click();
    cy.contains("new blog testTitle added")


  })

})
describe('After blog is created', function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: 'Jouni Toni',
      username: 'jtoni',
      password: 'kukka'
    }
    cy.request("POST", "http://localhost:3003/api/users/", user);


    cy.login({ username: "jtoni", password: "kukka" })
    cy.createBlog({ title: "test1", author: "test1", url: "test1", likes: 1 })
  })
  it('it can be liked', function () {
    cy.contains("show").click();
    cy.contains("like").click();
    cy.contains("2")
  })
  it('it can be deleted', function () {
    cy.contains("show").click();
    cy.contains("remove").click();
    cy.get('html').should('not.contain', 'testAuthor')
  })
  it('and 2 more blogs are added, all blogs are shown and sorted by likes', function () {

    cy.createBlog({ title: "test2", author: "test2", url: "test2", likes: 2 })
    cy.createBlog({ title: "test3", author: "test3", url: "test3", likes: 3 });

    cy.get(".show").click({ multiple: true })
    cy.get('.likes')
      .should(($likes) => {

        expect($likes).to.have.length(3)
        expect($likes.eq(0)).to.contain('3')
        expect($likes.eq(1)).to.contain('2')
        expect($likes.eq(2)).to.contain('1')

      })

  })
})