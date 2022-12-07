const REQUIRED_FIELD_ERR_MESSAGE = 'Pole jest wymagane'
const TEXT_RANGE_ERR_MESSAGE = (min, max) => {
    return `Pole powinno zawierać od ${min} do ${max} znaków`
}

window.onload = buildOnloadEvent('form.form', validateForm)

/**
 * @param {SubmitEvent} event 
 */
function validateForm(event) {
    /** @type {HTMLFormElement} */
    const form = event.target
    let valid = true;

    const nameInput = form.elements['name']
    const descriptionInput = form.elements['description']
    const imageLinkInput = form.elements['imageLink']
    const unitOfMeasureInput = form.elements['unitOfMeasure']

    const errorName = form.querySelector('#errorName')
    const errorDescription = form.querySelector('#errorDescription')
    const errorImageLink = form.querySelector('#errorImageLink')
    const errorUnitOfMeasure = form.querySelector('#errorUnitOfMeasure')
    const errorSummary = form.querySelector('#errorsSummary')

    resetErrors(
        [nameInput, descriptionInput, imageLinkInput, unitOfMeasureInput],
        [errorName, errorDescription, errorImageLink, errorUnitOfMeasure],
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

    if (!checkRequired(imageLinkInput.value)) {
        valid = false
        imageLinkInput.classList.add('error-input')
        errorImageLink.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkLink(imageLinkInput.value)) {
        valid = false;
        imageLinkInput.classList.add('error-input')
        errorImageLink.textContent = 'Nieprawidłowy link'
    }

    if (!checkRequired(unitOfMeasureInput.value)) {
        valid = false
        unitOfMeasureInput.classList.add('error-input')
        errorUnitOfMeasure.textContent = REQUIRED_FIELD_ERR_MESSAGE
    }

    if (!valid) {
        event.preventDefault()
        errorSummary.textContent = 'Formularz zawiera błędy.'
    }

}