const REQUIRED_FIELD_ERR_MESSAGE = 'Pole jest wymagane'
const TEXT_RANGE_ERR_MESSAGE = (min, max) => {
    return `Pole powinno zawierać od ${min} do ${max} znaków`
}

window.onload = buildOnloadEvent('form.form', validateForm)

/**
 * @param {SubmitEvent} event 
 */
function validateForm(event) {
    /**@type {HTMLFormElement} */
    const form = event.target
    let valid = true;

    const nameInput = form.elements['name']
    const cityInput = form.elements['city']
    const streetInput = form.elements['street']
    const phoneNumberInput = form.elements['phoneNumber']
    const emailInput = form.elements['email']

    const errorName = form.querySelector('#errorName')
    const errorCity = form.querySelector('#errorCity')
    const errorStreet = form.querySelector('#errorStreet')
    const errorPhoneNumber = form.querySelector('#errorPhoneNumber')
    const errorEmail = form.querySelector('#errorEmail')
    const errorSummary = form.querySelector('#errorsSummary')
    
    resetErrors(
        [nameInput, cityInput, streetInput, phoneNumberInput, emailInput],
        [errorName, errorCity, errorCity, errorStreet, errorPhoneNumber, errorEmail],
        errorSummary
    )

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add('error-input');
        errorName.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkTextLengthRange(nameInput.value, 3, 20)) {
        valid = false;
        nameInput.classList.add('error-input');
        errorName.textContent = TEXT_RANGE_ERR_MESSAGE(3, 20)
    }

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add('error-input');
        errorName.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkTextLengthRange(nameInput.value, 3, 20)) {
        valid = false;
        nameInput.classList.add('error-input');
        errorName.textContent = TEXT_RANGE_ERR_MESSAGE(3, 20)
    }

    if (!checkRequired(cityInput.value)) {
        valid = false;
        cityInput.classList.add('error-input');
        errorCity.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkTextLengthRange(cityInput.value, 1, 40)) {
        valid = false;
        cityInput.classList.add('error-input');
        errorName.textContent = TEXT_RANGE_ERR_MESSAGE(1, 40)
    }

    if (!checkRequired(streetInput.value)) {
        valid = false;
        streetInput.classList.add('error-input');
        errorStreet.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkTextLengthRange(streetInput.value, 1, 100)) {
        valid = false;
        streetInput.classList.add('error-input');
        errorStreet.textContent = TEXT_RANGE_ERR_MESSAGE(1, 100)
    }

    if (phoneNumberInput.value !== '' && !checkPhoneNumber(phoneNumberInput.value)) {
        valid = false
        phoneNumberInput.classList.add('error-input')
        errorPhoneNumber.textContent = 'Nieprawidłowy numer telefonu'
    }

    if (emailInput.value && !checkEmail(emailInput.value)) {
        valid = false
        emailInput.classList.add('error-input')
        errorEmail.textContent = 'Nieprawidłowy adres e-mail'
    }

    if (!valid) {
        event.preventDefault()
        errorSummary.textContent = 'Formularz zawiera błędy.'
    }
}