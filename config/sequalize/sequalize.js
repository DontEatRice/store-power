import { Sequelize } from "sequelize";

const sequalize = new Sequelize('tin-db', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
})

export default sequalize