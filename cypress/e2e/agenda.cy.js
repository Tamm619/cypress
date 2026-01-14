describe('Agenda de Contatos - Cypress E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve incluir um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type('Contato Cypress')
    cy.get('input[placeholder="E-mail"]').type('cypress@teste.com')
    cy.get('input[placeholder="Telefone"]').type('11999999999')

    cy.get('form').find('button').click()

    cy.contains('Contato Cypress').should('exist')
    cy.contains('cypress@teste.com').should('exist')
  })

  it('Deve editar um contato existente', () => {
  cy.contains('Contato Cypress')
    .parentsUntil('body')
    .last()
    .find('div')
    .eq(0)
    .scrollIntoView()
    .click({ force: true })

  cy.get('input[placeholder="Nome"]')
    .clear()
    .type('Contato Editado')

  cy.get('input[placeholder="E-mail"]').then(($el) => {
    const valor = $el.val()
    if (!valor) cy.wrap($el).type('cypress@teste.com')
  })

  cy.get('input[placeholder="Telefone"]').then(($el) => {
    const valor = $el.val()
    if (!valor) cy.wrap($el).type('11999999999')
  })

  cy.get('form').find('button').click()

  cy.contains('Contato Editado', { timeout: 8000 }).should('exist')
})

  it('Deve remover um contato', () => {
  cy.contains('li', 'Contato Editado').then(($li) => {
    const qtdAntes = $li.length

    cy.contains('li', 'Contato Editado')
      .first()
      .parents('.contato')
      .find('button.delete')
      .click()

    cy.contains('li', 'Contato Editado', { timeout: 8000 }).should(
      'have.length',
      Math.max(qtdAntes - 1, 0)
    )
  })
})



})
