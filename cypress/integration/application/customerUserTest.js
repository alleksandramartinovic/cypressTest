/// <reference types="Cypress" />
import '../../support/commands.js'
import { accountInfoC } from '../../fixtures/constAccountInfo.js'
import { fundsData1, fundsData2, fundsData3 } from '../../fixtures/constFundsData.js'

describe('Customer User Test suite', function () {
    beforeEach('Go to application', function () {
        cy.visit('/')
    });

    it('1. Add funds to user profile', function () {
        cy.login(accountInfoC.email, accountInfoC.firstName, accountInfoC.password);
        cy.addFunds(fundsData1.paymentMethod, fundsData1.amount);
        cy.addFunds(fundsData2.paymentMethod, fundsData2.amount);

    });

    it('2. Find and view hotel', function () {
        cy.login(accountInfoC.email, accountInfoC.firstName, accountInfoC.password);
        cy.findHotel('Jumeirah Beach Hotel');
    });

    it('3. Submit visa', function () {
        cy.login(accountInfoC.email, accountInfoC.firstName, accountInfoC.password);
        cy.submitVisa('Serbia', 'Spain', '25-05-2022');
    })


    //it('4. View pending booking', function () {
    //    cy.login(accountInfoC.email, accountInfoC.firstName, accountInfoC.password);
    //    cy.get('[class="author__title"]').should('have.text', accountInfoC.firstName);
    //    cy.get('.breadcrumb-content > .section-heading > .sec__title').should('have.text', 'Hi, ' + accountInfoC.firstName + ' Welcome Back');
    //    cy.get('.sidebar-menu').find('a[href*="bookings"]').click({ force: true });
        //cy.get(':nth-child(1) > :nth-child(5) > .table-content > .theme-btn').click({ force: true });
        //cy.get('.payment_gateway').select(fundsData2.paymentMethod);
        //cy.get('#form').submit();
        //i ova ideja je propala jer se otvara u novom tabu...
    //    cy.get(':nth-child(1) > :nth-child(5) > .table-content > .theme-btn').should('have.text', ' View Voucher');
    //    cy.logout();
    //})
})