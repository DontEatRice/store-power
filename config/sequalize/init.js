import Pricebook from "../../model/sequalize/Pricebook.js"
import Product from "../../model/sequalize/Product.js"
import Store from "../../model/sequalize/Store.js"
import UnitOfMeasure from "../../model/sequalize/UnitOfMeasure.js"
import sequalize from "./sequalize.js"
import { hashPassword } from "../../controllers/utils.js"

const fillSampleData = async () => {
    const storeCount = await Store.count()
    const productCount = await Product.count()
    const unitsCount = await UnitOfMeasure.count()

    let stores, products;
    if (storeCount == 0) {
        stores = await Store.bulkCreate([
            { name: 'Frog Shop', city: 'Warszawa', street: 'al. Marszałkowska 20', email: 'warsaw@frog.shop', password: await hashPassword('12345') },
            { name: 'Jedzeniomat', city: 'Warszawa', street: 'Koszykowa 85B', email: 'koszykowa@jedzeniomat.net', password: await hashPassword('admin') }
        ])
    }
    if (productCount == 0 && unitsCount == 0) {
        const units = await UnitOfMeasure.bulkCreate([
            { label: 'Litry', name: 'L' },
            { label: 'Sztuki', name: 'SZT' },
            { label: 'Kilogramy', name: 'KG' },
        ])
        products = await Product.bulkCreate([
            { name: 'Mleko 2%', unitOfMeasureId: units[0].id, description: 'Pij mleko będziesz wielki!', imageLink: 'https://pl.wikipedia.org/wiki/Mleko#/media/Plik:Milk_glass.jpg' },
            { name: 'Ziemniaki 1KG', unitOfMeasureId: units[2].id, description: 'Frytki, Czipsy, czyli to co tygryski lubią najbardziej!', imageLink: 'https://dietetycy.org.pl/wp-content/uploads/2016/09/156549667_m-1600x1067.jpg' }
        ])
    }

    if (stores && products) {
        const validFrom = new Date()
        validFrom.setMonth(validFrom.getMonth() - 1)
        const validTo = new Date()
        validTo.setMonth(validTo.getMonth() + 1)
        await Pricebook.bulkCreate([
            // Mleko 2% -- Frog Shop
            { productId: products[0].id, storeId: stores[0].id, price: 1.23, quantity: 1 },
            // Ziemniaki 1KG -- Frog Shop
            { productId: products[1].id, storeId: stores[0].id, price: 0.89, quantity: 1, validFrom, validTo },
            // Mleko 2% -- Jedzeniomat
            { productId: products[0].id, storeId: stores[1].id, price: 1, quantity: 1 },
            // Ziemniaki 1KG -- Jedzeniomat
            { productId: products[1].id, storeId: stores[1].id, price: 0.99, quantity: 1, validFrom, validTo }
        ])
    }
}

export default async () => {
    Store.hasMany(Pricebook, {
        foreignKey: 'storeId',
        onDelete: 'CASCADE',
        as: 'pricebooks'
    })
    Pricebook.belongsTo(Store, {
        foreignKey: 'storeId',
        as: 'store'
    })
    Product.hasMany(Pricebook, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        as: 'pricebooks'
    })
    Pricebook.belongsTo(Product, {
        foreignKey: 'productId',
        as: 'product'
    })
    UnitOfMeasure.hasMany(Product, {
        foreignKey: 'unitOfMeasureId',
        onDelete: 'SET NULL',
        as: 'products'
    })
    Product.belongsTo(UnitOfMeasure, {
        foreignKey: 'unitOfMeasureId',
        as: 'unitOfMeasure'
    })

    await sequalize.sync({ force: true })

    // if not prod
    await fillSampleData()
}