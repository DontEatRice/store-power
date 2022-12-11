import { DataTypes } from "sequelize";
import sequalize from "../../config/sequalize/sequalize.js";

const NOT_NULL_MESSAGE = 'Pole nie powinno być puste!'
const TEXT_RANGE_ERR_MESSAGE = (min, max) => {
    return `Pole powinno zawierać od ${min} do ${max} znaków`
}

const Product = sequalize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
            msg: 'Produkt z taką nazwą już istnieje!'
        },
        validate: {
            notNull: {
                msg: NOT_NULL_MESSAGE
            }, 
            len: {
                args: [3, 50],
                msg: TEXT_RANGE_ERR_MESSAGE(3, 50)
            }
        }
    },
    imageLink: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'Zły format linku! (https://foo.com)'
            },
            notNull: {
                msg: NOT_NULL_MESSAGE
            }
        }
    },
    description: {
        type: DataTypes.STRING(600),
        validate: {
            len: {
                args: [0, 600],
                msg: 'Pole powinno zawierać maksymalnie 600 znaków!'
            }
        }
    }, 
    unitOfMeasureId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

export default Product