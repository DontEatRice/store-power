import { DataTypes } from "sequelize";
import sequalize from "../../config/sequalize/sequalize.js";

const NOT_NULL_MESSAGE = 'Pole nie powinno być puste!'
const TEXT_RANGE_ERR_MESSAGE = (min, max) => {
    return `Pole powinno zawierać od ${min} do ${max} znaków`
}

const Store = sequalize.define('Stores', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: {
            msg: 'Sklep z taką nazwą już istnieje!'
        },
        validate: {
            notNull: {
                msg: NOT_NULL_MESSAGE
            },
            len: {
                args: [3, 20],
                msg: TEXT_RANGE_ERR_MESSAGE(3, 20)
            }
        }
    },
    city: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            len: {
                args: [0, 25],
                msg: 'Pole powinno zawierać maksymalnie 25 znaków!'
            },
            notNull: {
                msg: NOT_NULL_MESSAGE,
            }
        }
    },
    street: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            len: {
                args: [1, 150],
                msg: 'Pole powinno zawierać maksymalnie 150 znaków!'
            },
            notNull: {
                msg: NOT_NULL_MESSAGE
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING(9),
        validate: {
            /**
             * @param {string | null} value 
             */
            isCorrectPhoneNumber(value) {
                if (value && !/\d{9}/gm.test(value))
                    throw new Error('Nieprawidłowy format numeru telefonu!')
            }
        }
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Podany adres e-mail nie jest prawidłowy.'
            },
            len: {
                args: [0, 50],
                msg: 'Pole powinno zawierać maksymalnie 50 znaków!'
            },
            notNull: {
                msg: NOT_NULL_MESSAGE
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Store