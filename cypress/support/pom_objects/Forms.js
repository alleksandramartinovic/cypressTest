const SigninForm = {
    email: '[placeholder="Email"]',
    password: '[name="password"]',
    signinSubmitButton: '.btn-default > .ladda-label'
}

const SignupForm = {
    firstName: '[name="first_name"]',
    lastName: '[name="last_name"]',
    phone: '[name="phone"]', 
    email: '[name="email"]',
    password: '[name="password"]',
    accountType: '#select2-account_type-container',
    accTypeDropdown: '.select2-results',
    signupSubmitButton: '.mt-3 > .btn'
}

export {SigninForm, SignupForm}