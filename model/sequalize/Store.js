import { DataTypes } from "sequelize";
import sequalize from "../../config/sequalize/sequalize.js";

const Store = sequalize.define('Stores', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            len: {
                args: [0, 25],
                msg: 'Długość powinna wynosić maksymalnie 25 znaków!'
            },
            notEmpty: {
                msg: 'Pole nie powinno być puste!',
            }
        }
    },
    street: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            len: {
                args: [1, 150],
                msg: 'Długość powinna wynosić maksymalnie 150 znaków!'
            },
            notNull: {
                msg: 'Pole nie powinno być puste!'
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
                if (value !== null && !/\d{9}/gm.test(value))
                    throw new Error('Nieprawidłowy format numeru telefonu!')
            }
        }
    },
    email: {
        type: DataTypes.STRING(50),
        validate: {
            isEmail: {
                msg: 'Podany adres e-mail nie jest prawidłowy.'
            }
        }
    }
})

export default Store