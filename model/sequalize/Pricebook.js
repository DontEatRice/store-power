import { DataTypes } from "sequelize";
import sequalize from "../../config/sequalize/sequalize.js";

const NOT_NULL_MESSAGE = 'Pole nie powinno być puste!'
const MIN_DATE = '2022-10-09'
const MAX_DATE = '2025-10-10'

const Pricebook = sequalize.define('Pricebooks', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: NOT_NULL_MESSAGE
            },
            priceValidation(value) {
                try {
                    value = parseFloat(value)
                } catch {
                    throw new Error('Podana wartość nie jest liczbą!')
                }

                if (value < 0.01 || value > 99999.99) {
                    throw new Error('Liczba nie zawiera się w przedziale od 0.01 zł do 99999.99 zł')
                }
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: NOT_NULL_MESSAGE
            },
            validateQuantity(value) {
                value = Number(value)
                if (Number.isNaN(value) || !Number.isInteger(value)) {
                    throw new Error('Wartość powinna być liczbą naturalną!')
                }
                if (value <= 0) {
                    throw new Error('Ilość powinna być większa od 0!')
                }
            }
        }
    },
    validFrom: {
        type: DataTypes.DATE,
        validate: {
            isDate: {
                msg: 'Podana wartość nie jest datą'
            },   
            isAfter: {
                args: MIN_DATE,
                msg: 'Data nie może być mniejsza niż ' + MIN_DATE
            },
            isBefore: {
                args: MAX_DATE,
                msg: 'Data nie może być większa niż ' + MAX_DATE
            }
        }
    },
    validTo: {
        type: DataTypes.DATE,
        validate: {
            isDate: {
                msg: 'Podana wartość nie jest datą'
            },
            isAfter: {
                args: MIN_DATE,
                msg: 'Data nie może być mniejsza niż ' + MIN_DATE
            },
            isBefore: {
                args: MAX_DATE,
                msg: 'Data nie może być większa niż ' + MAX_DATE
            }
        }
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: NOT_NULL_MESSAGE
            }
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: NOT_NULL_MESSAGE
            }
        }
    }
})

export default Pricebook