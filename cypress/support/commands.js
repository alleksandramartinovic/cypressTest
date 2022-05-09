// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { accountInfoC } from '../fixtures/constAccountInfo.js'
import { MainHeader } from './pom_objects/MainPage.js'
import { SigninForm, SignupForm } from './pom_objects/Forms.js'
import { LeftNavigation, MyProfilePage, AddFundsPage, PaymentCard, Header } from './pom_objects/UserProfilePage.js'
import { HotelsPageHeader, FeaturedHotelsList, HotelPage } from './pom_objects/HotelsPage.js'
import { SubmittedVisa, VisaSubmissionForm, VisaSubmitForm } from './pom_objects/VisaPage.js'

Cypress.Commands.add('login', (email, username, password) => {
    cy.get(MainHeader.loginButton).invoke('removeAttr', 'target').click({ force: true });
    cy.get(SigninForm.email).type(email, { force: true });
    cy.get(SigninForm.password).type(password, { force: true });
    cy.get(SigninForm.signinSubmitButton).click({ force: true });
    //cy.get("span").contains('Login').click({ force: true });
    //cy.get('[class="author__title"]').should('have.text',username);
    //cy.get('.breadcrumb-content > .section-heading > .sec__title').should('have.text','Hi, alexc1 Welcome Back');
})

Cypress.Commands.add('logout', () => {
    cy.get(LeftNavigation.leftNav).find(LeftNavigation.logout).click({ force: true });
})

Cypress.Commands.add('signup', (firstname, lastname, phone, email, password, accounttype) => {
    cy.get(MainHeader.signupButton).invoke('removeAttr', 'target').click({ force: true });
    //cy.get('.modal-title title').should('have.text', 'Signup');
    cy.get(SignupForm.firstName).type(firstname, { force: true });
    cy.get(SignupForm.lastName).type(lastname, { force: true });
    cy.get(SignupForm.phone).type(phone, { force: true });
    cy.get(SignupForm.email).type(email, { force: true });
    cy.get(SignupForm.password).type(password, { force: true });
    cy.get(SignupForm.accountType).click({ force: true });
    if (accounttype === 'Customer') {
        cy.get(SignupForm.accTypeDropdown).contains('Customer').click({ force: true });
    }
    else if (accounttype === 'Agent') {
        cy.get(SignupForm.accTypeDropdown).contains('Agent').click({ force: true });
    }
    cy.get(SignupForm.signupSubmitButton).click({ force: true });
})

Cypress.Commands.add('checkProfile', (firstname, lastname, phone, email, city, address) => {
    cy.get(LeftNavigation.leftNav).find(LeftNavigation.myProfile).click({ force: true });
    cy.get(MyProfilePage.name).should('have.attr', 'value', firstname);
    cy.get(MyProfilePage.lastName).should('have.attr', 'value', lastname);
    cy.get(MyProfilePage.phone).should('have.attr', 'value', phone);
    cy.get(MyProfilePage.email).should('have.attr', 'value', email);
    //cy.get('#from_country').should('have.attr', 'title', countryAlias);
    cy.get(MyProfilePage.city).should('have.attr', 'value', city);
    cy.get(MyProfilePage.address).should('have.attr', 'value', address);
})

Cypress.Commands.add('updateProfile', (firstname, lastname, phone, email, city, address) => {
    cy.get(LeftNavigation.leftNav).find(LeftNavigation.myProfile).click({ force: true });
    cy.get(MyProfilePage.name).clear().type(firstname, { force: true });
    cy.get(MyProfilePage.lastName).clear().type(lastname, { force: true });
    cy.get(MyProfilePage.phone).clear().type(phone, { force: true });
    cy.get(MyProfilePage.email).clear().type(email, { force: true });
    //cy.get('#from_country').select(country, {force:true});
    cy.get(MyProfilePage.city).type(city, { force: true });
    cy.get(MyProfilePage.address).type(address, { force: true });
    cy.get(MyProfilePage.updateProfileButton).click({ force: true });
    cy.get(MyProfilePage.alert).contains('successfully');
    cy.url().should('eq', 'https://www.phptravels.net/account/profile/success');
})

Cypress.Commands.add('addFunds', (paymentMethod, amount) => {
    cy.get(LeftNavigation.leftNav).find(LeftNavigation.addFunds).click({ force: true });   
    if (paymentMethod === 'bank transfer') {
        cy.get(AddFundsPage.bankTransferCheckbox).check();
    }
    else if (paymentMethod === 'paypal') {
        cy.get(AddFundsPage.paypalCheckbox).check();
    }
    //stripe sam izbacila jer se javlja error kad se na to klikne
    //else if (paymentMethod === 'stripe') {
    //    cy.get(AddFundsPage.stripeCheckbox).check();
    //}
    cy.get(AddFundsPage.amountField).clear().type(amount);
    cy.get(AddFundsPage.payButton).click();
    cy.get(PaymentCard.cardHeader).contains('Pay With ' + paymentMethod + ' USD ' + amount + '.00');
    cy.get(PaymentCard.backInvoiceButton).click();
    cy.get(PaymentCard.yesButton).click();
    cy.get(AddFundsPage.walletBalance).contains('USD 1500');
    //da ovaj deo radi ok, prvo bih asertovala sumu odavde, pa bih dodala neki amount
    //i asertovala novi amount kao zbir
})

Cypress.Commands.add('findHotel', (hotel) => {
    cy.get(Header.hotelsLink).click({ force: true });
    cy.get(HotelsPageHeader.title).should('have.text', 'SEARCH FOR BEST HOTELS');
    cy.get(FeaturedHotelsList.title).should('have.text', 'Featured Hotels');
    //ideja je bila da kucam u ova search polja, ali isprobala sam zilion varijanti:
    //ako stavim da trazi element u kome moze da se kuca, onda ga ne pronalazi,
    //ako stavim element koji pronadje i klikne u njemu, nece ni sa force da ukuca...w
    //desavalo se i da test kao prodje, ne javi nikakvu gresku, a nista nije ukucano
    //ovo ovde su samo 2 varijante koje sam isprobala, a probala sam jos jako puno
    //cy.get('#hotels_city.city.form-control.select2-hidden-accessible').type('Dubai',{force:true});
    //cy.get('#select2-hotels_city-container.select2-selection__rendered').click({force:true}).type('Dubai',{force:true});
    //cy.get('.select2-results__option--highlighted').click('{force:true}');
    //cy.get('#checkin').type('22-05-2022', { force: true });
    //cy.get('#checkout').type('29-05-2022', { force: true });
    cy.get(FeaturedHotelsList.cardTitle).contains(hotel).click({ force: true });
    cy.get(HotelPage.title).contains(hotel);
})

Cypress.Commands.add('submitVisaData', (firstName, email, date) => {
    cy.get(VisaSubmissionForm.firstname).type(firstName, { force: true });
    cy.get(VisaSubmissionForm.email).type(email, { force: true });
    cy.get(VisaSubmissionForm.date).should('have.attr', 'value', date);
    cy.get(VisaSubmissionForm.submit).click({ force: true });
})

Cypress.Commands.add('submitVisa', (from, to, date) => {
    cy.get(Header.visaLink).click({ force: true });
    cy.get(VisaSubmitForm.fromCountry).select(from, { force: true });
    cy.get(VisaSubmitForm.toCountry).select(to, { force: true });
    cy.get(VisaSubmitForm.date).clear({ force: true }).type(date, { force: true });
    cy.get(VisaSubmitForm.submit).click({ force: true });
    cy.submitVisaData(accountInfoC.firstName, accountInfoC.email, '25-05-2022')
    cy.get(SubmittedVisa.header).contains('Submitted');
    cy.get(SubmittedVisa.info).contains('Your visa form has been submitted');
})

