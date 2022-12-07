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

    const labelInput = form.elements['label']
    const nameInput = form.elements['name']

    const errorName = form.querySelector('#errorName')
    const errorLabel = form.querySelector('#errorLabel')
    const errorSummary = form.querySelector('#errorsSummary')

    resetErrors(
        [labelInput, nameInput],
        [errorLabel, errorName],
        errorSummary
    )

    if (!checkRequired(labelInput.value)) {
        valid = false;
        labelInput.classList.add('error-input');
        errorLabel.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkTextLengthRange(labelInput.value, 1, 20)) {
        valid = false;
        labelInput.classList.add('error-input');
        errorLabel.textContent = TEXT_RANGE_ERR_MESSAGE(1, 20)
    }

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add('error-input');
        errorName.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkTextLengthRange(nameInput.value, 1, 3)) {
        valid = false;
        nameInput.classList.add('error-input');
        errorName.textContent = TEXT_RANGE_ERR_MESSAGE(1, 3)
    } else if (!checkForRegex(nameInput.value, /[A-Z]+/gm)) {
        valid = false;
        nameInput.classList.add('error-input');
        errorName.textContent = 'Skrót powinien składać się tylko z dużych liter od A do Z'
    }

    if (!valid) {
        event.preventDefault()
        errorSummary.textContent = 'Formularz zawiera błędy.'
    }
}