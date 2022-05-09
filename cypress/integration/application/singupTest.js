/// <reference types="Cypress" />
import '../../support/commands.js'
import { accountInfoAgent, accountInfoCust, accountInfoC } from '../../fixtures/constAccountInfo.js'

describe('SingUp Test suite', function () {
    beforeEach('Go to application', function () {
        cy.visit('/')
    });

    it('1. Create new customer user', function () {
        cy.signup(accountInfoCust.firstName, accountInfoCust.lastName, accountInfoCust.phone, accountInfoCust.email, accountInfoCust.password, accountInfoCust.accountType)
        cy.get('.alert').contains('successfull');
        cy.url().should('eq', 'https://www.phptravels.net/login/signup');
    });

    it('2. Create new agent user', function () {
        cy.signup(accountInfoAgent.firstName, accountInfoAgent.lastName, accountInfoAgent.phone, accountInfoAgent.email, accountInfoAgent.password, accountInfoAgent.accountType)
        cy.get('.alert').contains('successfull');
        cy.url().should('eq', 'https://www.phptravels.net/login/signup');
    });

    it('3. Create user with existing email', function () {
        cy.signup(accountInfoC.firstName, accountInfoC.lastName, accountInfoC.phone, accountInfoC.email, accountInfoC.password, accountInfoC.accountType);
        cy.get('.alert').contains('Email already exist');
        cy.url().should('eq', 'https://www.phptravels.net/signup/failed');
    })
})