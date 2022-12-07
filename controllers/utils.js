import { ValidationErrorItem } from "sequelize";

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