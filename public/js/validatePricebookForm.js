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

    const productInput = form.elements['product']
    const storeInput = form.elements['store']
    const priceInput = form.elements['price']
    const validFromInput = form.elements['validFrom']
    const validToInput = form.elements['validTo']
    const quantityInput = form.elements['quantity']

    const errorProduct = form.querySelector('#errorProduct')
    const errorStore = form.querySelector('#errorStore')
    const errorPrice = form.querySelector('#errorPrice')
    const errorValidFrom = form.querySelector('#errorValidFrom')
    const errorValidTo = form.querySelector('#errorValidTo')
    const errorQuantity = form.querySelector('#errorQuantity')
    const errorSummary = form.querySelector('#errorsSummary')

    resetErrors(
        [productInput, storeInput, priceInput, validFromInput, validToInput, quantityInput],
        [errorProduct, errorStore, errorPrice, errorValidFrom, errorValidTo, errorQuantity],
        errorSummary
    )

    if (!checkRequired(productInput.value)) {
        valid = false;
        productInput.classList.add('error-input');
        errorProduct.textContent = REQUIRED_FIELD_ERR_MESSAGE
    }    
    if (!checkRequired(storeInput.value)) {
        valid = false;
        storeInput.classList.add('error-input');
        errorStore.textContent = REQUIRED_FIELD_ERR_MESSAGE
    }
    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add('error-input');
        errorPrice.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkNumberRange(priceInput.value, 0.00001, Number.MAX_SAFE_INTEGER)) {
        valid = false;
        priceInput.classList.add('error-input')
        errorPrice.textContent = 'Cena powinna być większa od 0'
    }

    if (
        validFromInput.value &&
        validToInput.value &&
        !checkDateIfAfter(validToInput.value, validFromInput.value)
    ) {
        valid = false
        validFromInput.classList.add('error-input')
        validToInput.classList.add('error-input')
        errorValidTo.textContent = 'Data powinna być większa od daty rozpoczęcia obowiązywania'
    }

    if (!checkRequired(quantityInput.value)) {
        valid = false;
        quantityInput.classList.add('error-input');
        errorQuantity.textContent = REQUIRED_FIELD_ERR_MESSAGE
    } else if (!checkNumberRange(quantityInput.value, 0.0001, Number.MAX_SAFE_INTEGER)) {
        valid = false;
        quantityInput.classList.add('error-input')
        errorQuantity.textContent = 'Ilość powinna być większa od 0'
    }

    
    if (!valid) {
        event.preventDefault()
        errorSummary.textContent = 'Formularz zawiera błędy'
    }
}