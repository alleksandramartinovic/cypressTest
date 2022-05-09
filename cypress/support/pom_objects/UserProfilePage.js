const Header = {
    hotelsLink: 'a[href*="hotels"]',
    visaLink: 'a[href*="visa"]'
}

const LeftNavigation = {
    leftNav: '.sidebar-menu', 
    addFunds: 'a[href*="add_funds"]',
    myProfile: 'a[href*="profile"]',
    logout: 'a[href*="logout"]'
}

const MyProfilePage = {
    name: '[name="firstname"]', 
    lastName: '[name="lastname"]',
    phone: '[name="phone"]',
    email: '[name="email"]',
    city: '[name="city"]',
    address: '[name="address1"]',
    updateProfileButton: '.btn-box > .theme-btn',
    alert: '.alert'
}

const AddFundsPage = {
    walletBalance: '.user_wallet > .icon-box > .d-flex > .info-content > .info__title',
    bankTransferCheckbox: '#gateway_bank-transfer',
    paypalCheckbox: '#gateway_paypal',
    stripeCheckbox: '#gateway_stripe',
    amountField: '[name="price"]',
    payButton: '.btn-primary'
}

const PaymentCard = {
    cardHeader: '.card-header',
    backInvoiceButton: '.btn-front',
    yesButton: '.yes'
}

export { Header, LeftNavigation, MyProfilePage, AddFundsPage, PaymentCard }