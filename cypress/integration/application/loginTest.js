/// <reference types="Cypress" />
import '../../support/commands.js'
import { accountInfoC, accountInfoWrong } from '../../fixtures/constAccountInfo.js'

describe('Login Test suite', function () {
    beforeEach('Go to application', function () {
        cy.visit('/')
    });

    it('1. Log in to application and log out', function () {
        cy.login(accountInfoC.email, accountInfoC.firstName, accountInfoC.password);
        cy.get('[class="author__title"]').should('have.text', accountInfoC.firstName);
        cy.get('.breadcrumb-content > .section-heading > .sec__title').should('have.text', 'Hi, ' + accountInfoC.firstName + ' Welcome Back');
        cy.logout();
    });

    it('2. Log in with wrong credentials', function () {
        cy.login(accountInfoWrong.email, accountInfoWrong.firstName, accountInfoWrong.password);
        cy.url().should('eq', 'https://www.phptravels.net/login/failed');
        cy.get('.alert').contains('Wrong credentials');
    })

})