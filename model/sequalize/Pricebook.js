import { DataTypes } from "sequelize";
import sequalize from "../../config/sequalize/sequalize.js";

const Pricebook = sequalize.define('Pricebooks', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    validFrom: {
        type: DataTypes.DATE
    },
    validTo: {
        type: DataTypes.DATE
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Pricebook