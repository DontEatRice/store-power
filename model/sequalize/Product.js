import { DataTypes } from "sequelize";
import sequalize from "../../config/sequalize/sequalize.js";

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
        unique: true
    },
    imageLink: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(600),
    }, 
    unitOfMeasureId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

export default Product