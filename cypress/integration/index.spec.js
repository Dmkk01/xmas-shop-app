const url = "http://localhost:3000/"

describe('Droppe Xmas', () => {
    beforeEach(() => {
        cy.visit(url)
        cy.viewport(1920, 1080)
    })

    it('Loaders', () => {
        cy.get('[data-cy=product-loader]').should('not.exist')
        cy.get('[data-cy=data-loader]').should('exist')
        cy.waitUntil(() => cy.get('[data-cy=data-loader]').should('not.exist').then(() => {
            cy.waitUntil(() => cy.get('[data-cy=product-loader]').should('not.exist').then(() => {
                cy.get('[data-cy=cart-component]').should('exist')
                cy.get('[data-cy=product-component]').should('exist')
            }));
        }));
    })

    it('Modal behaviour', () => {
        cy.get('[data-cy=modal-component]').should('not.exist');
        cy.get('[data-cy=submit-button]').click()
        cy.get('[data-cy=modal-component]').should('be.visible')
        cy.get('[data-cy=modal-close]').click()
        cy.get('[data-cy=modal-component]').should('not.exist');
    })

    it('Card component', () => {
        cy.get('[data-cy=cart-component]').should('have.length', 5)
    })

    it('Product component', () => {
        cy.waitUntil(() => cy.get('[data-cy=data-loader]').should('not.exist').then(() => {
            cy.waitUntil(() => cy.get('[data-cy=product-loader]').should('not.exist').then(() => {
                cy.get('[data-cy=product-component]').its('length').should('be.gte', 5)
            }));
        }));
    })

    it('Approve/Discard Buttons', () => {
        cy.waitUntil(() => cy.get('[data-cy=data-loader]').should('not.exist').then(() => {
            cy.waitUntil(() => cy.get('[data-cy=product-loader]').should('not.exist').then(() => {
                cy.get('[data-cy=approve-button]').eq(0).click()
                cy.get('[data-cy=discard-button').eq(1).click()
                cy.get('[data-cy=approve-button]').eq(2).click()
                cy.get('[data-cy=submit-button]').click()
                cy.get('[data-cy=modal-item-list]').should('have.length', 3)
            }));
        }));

    })

    it('Submit button', () => {
        cy.get('[data-cy=submit-button]').click()
        cy.get('[data-cy=final-submit]').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Your items were submitted! \nThank you for using Droppe Xmas')
          })
    })

    it('Total price', () => {
        cy.waitUntil(() => cy.get('[data-cy=data-loader]').should('not.exist').then(() => {
            cy.waitUntil(() => cy.get('[data-cy=product-loader]').should('not.exist').then(() => {
                cy.get('[data-cy=approve-button]').eq(0).click()
                cy.get('[data-cy=approve-button').eq(1).click()
                cy.get('[data-cy=approve-button]').eq(2).click()
                cy.get('[data-cy=submit-button]').click()
                cy.get('[data-cy=total-price]').contains('188.24')
            }));
        }));
    })
})