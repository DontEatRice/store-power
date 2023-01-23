import bcrypt from "bcryptjs";
import { ValidationError, ValidationErrorItem } from "sequelize";

/**
 * @param {ValidationErrorItem[]} errors
 * @return {Map<string, ValidationErrorItem>} 
 */
export const mapValidationErrorsByName = (errors) => {
    const map = new Map()
    errors.forEach(error => {
        map.set(error.path, error)
    })
    return map;
}

/** 
 * @param {any} error
 * @param {import("express").Response} res
 * @returns {void}
 */
export const handleApiError = (error, res) => {
    if (error instanceof ValidationError) {
        const errors = Object.fromEntries(mapValidationErrorsByName(error.errors))
        return res.status(400).json({
            validationErrors: errors
        })
    }
    error.statusCode = 500
    res.status(500).json(error)
}

const salt = bcrypt.genSaltSync(8)

/**
 * Hashes plain password
 * @param {string} pass 
 * @returns {Promise<string>}
 */
export const hashPassword = pass => {
    return bcrypt.hash(pass, salt)
}

/**
 * @param {string} passPlain 
 * @param {string} passHash 
 * @returns {Promise<boolean>}
 */
export const comparePasswords = (passPlain, passHash) => {
    return bcrypt.compare(passPlain, passHash)
}

