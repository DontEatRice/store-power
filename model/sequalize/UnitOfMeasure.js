import { DataTypes } from "sequelize";
import sequalize from "../../config/sequalize/sequalize.js";

const NOT_NULL_MESSAGE = 'Pole nie powinno być puste!'
const TEXT_RANGE_ERR_MESSAGE = (min, max) => {
    return `Pole powinno zawierać od ${min} do ${max} znaków`
}

const UnitOfMeasure = sequalize.define('UnitOfMeasure', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        allowNull: false,
        type: DataTypes.STRING(20),
        validate: {
            notNull: {
                msg: NOT_NULL_MESSAGE
            },
            len: {
                args: [1, 20],
                msg: TEXT_RANGE_ERR_MESSAGE(1, 20)
            }
        }
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(3),
        validate: {
            len: {
                args: [1, 3],
                msg: TEXT_RANGE_ERR_MESSAGE(1, 3)
            },
            is: {
                args: /[A-Z]+/gm,
                msg: 'Skrót powinien składać się tylko z dużych liter od A do Z'
            },
            notNull: {
                msg: NOT_NULL_MESSAGE
            }
        }
    }
})

export default UnitOfMeasure