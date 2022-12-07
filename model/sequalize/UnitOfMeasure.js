import { DataTypes } from "sequelize";
import sequalize from "../../config/sequalize/sequalize.js";

const UnitOfMeasure = sequalize.define('UnitOfMeasure', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        allowNull: false,
        type: DataTypes.STRING(20)
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(3)
    }
})

export default UnitOfMeasure