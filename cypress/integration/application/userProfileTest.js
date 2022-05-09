/// <reference types="Cypress" />
import '../../support/commands.js'
import { accountInfoCust, accountInfoCustUpdate } from '../../fixtures/constAccountInfo.js'

describe('Application Test suite', function () {
    beforeEach('Go to application', function () {
        cy.visit('/')
    });

    it('1. Create new customer user', function () {
        cy.signup(accountInfoCust.firstName, accountInfoCust.lastName, accountInfoCust.phone, accountInfoCust.email, accountInfoCust.password, accountInfoCust.accountType)
    });

    it('2. Check data on user profile', function () {
        cy.login(accountInfoCust.email, accountInfoCust.firstName, accountInfoCust.password);
        cy.checkProfile(accountInfoCust.firstName, accountInfoCust.lastName, accountInfoCust.phone, accountInfoCust.email, accountInfoCust.city, accountInfoCust.address);
    })

    it('3. Update user profile and check data again', function () {
        cy.login(accountInfoCust.email, accountInfoCust.firstName, accountInfoCust.password);
        cy.updateProfile(accountInfoCustUpdate.firstName, accountInfoCustUpdate.lastName, accountInfoCustUpdate.phone, accountInfoCustUpdate.email, accountInfoCustUpdate.city, accountInfoCustUpdate.address);
        cy.checkProfile(accountInfoCustUpdate.firstName, accountInfoCustUpdate.lastName, accountInfoCustUpdate.phone, accountInfoCustUpdate.email, accountInfoCustUpdate.city, accountInfoCustUpdate.address);
        //cy.get('.alert').should('have.text', '\n Profile updated successfully.');
    })

})