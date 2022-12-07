/**
 * Resets all error indicators on given inputs and error labels
 * @param {HTMLElement[]} inputs 
 * @param {HTMLSpanElement[]} errorLabels 
 * @param {HTMLParagraphElement} errorSummary 
 */
function resetErrors(inputs, errorLabels, errorSummary) {
    inputs.forEach(input => {
        input.classList.remove('error-input')
    })
    errorLabels.forEach(label => {
        label.textContent = ''
    })
    errorSummary.textContent = ''
}

function checkRequired(value) {
    return (
        value && 
        !(typeof value === 'string' && value.trim() === '')
    )
}

/**
 * @param {any} value 
 * @param {number} min 
 * @param {number} max 
 */
function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false
    }
    value = value.toString().trim()
    const len = value.length
    if (
        (max && len > max) ||
        (min && len < min)
    ) {
        return false
    }

    return true
}

/**
 * 
 * @param {string?} value 
 */
function checkEmail(value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return checkForRegex(value, re)
}

function checkLink(value) {
    const re = /(https?:\/\/[^\s]+)/g
    return checkForRegex(value, re)
}

function checkPhoneNumber(value) {
    const re = /\d/gm
    return checkForRegex(value, re) && value.length === 9
}

/**
 * @param {string?} value 
 * @param {RegExp} regex 
 */
function checkForRegex(value, regex) {
    if (!value) {
        return false
    }

    value = value.trim()
    return regex.test(value)
}

/**
 * @param {number | string | null} value 
 * @returns {boolean}
 */
function checkNumber(value) {
    return value && !isNaN(value)
}

/**
 * @param {string?} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {boolean}
 */
function checkNumberRange(value, min, max) {
    if (!checkNumber(value))
        return false

    value = parseFloat(value)
    return  value >= min && value <= max
}

function checkDate(value) {
    const re = /(\d{4})-(\d{2})-(\d{2})/
    return checkForRegex(value, re)
}

/**
 * @param {string} value 
 * @param {string} compareTo 
 */
function checkDateIfAfter(value, compareTo) {
    if (
        !value ||
        !compareTo ||
        !checkDate(value) ||
        !checkDate(compareTo)
    ) {
        return false
    }
    return new Date(value) >= new Date(compareTo)
}

/**
 * @param {string} formSelector 
 * @param {*} fun 
 */
function buildOnloadEvent(formSelector, fun) {
    return _ => {
        document.querySelector(formSelector).addEventListener('submit', fun)
    }
}