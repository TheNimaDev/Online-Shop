const { v4: uuidV4 } = require('uuid')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [theBooksCategory] = await queryInterface.sequelize.query(`
      SELECT id FROM tbl_categories WHERE slug = "books"
    `)
    await queryInterface.bulkInsert("tbl_products",
      [
        {
          id: uuidV4(),
          slug: "shahnameh",
          title: "The Shahnameh",
          price: 750000,
          description: "The Book Of Shahnameh By Ferdowsi",
          inventory: 20,
          category_id: theBooksCategory[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidV4(),
          slug: "children_book",
          title: "Children Book",
          price: 200000,
          description: "The Children's Bbooks For Children Under 10 Years Old",
          inventory: 30,
          category_id: theBooksCategory[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    )

    const [theMusicsCategory] = await queryInterface.sequelize.query(`
      SELECT id FROM tbl_categories WHERE slug = "musical_instruments"
    `)
    await queryInterface.bulkInsert("tbl_products",
      [
        {
          id: uuidV4(),
          slug: "guitar",
          title: "The Yamaha Guitar",
          price: 18000000,
          description: "A Great Guitar For Those Who Want To Work Professionally",
          inventory: 10,
          category_id: theMusicsCategory[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidV4(),
          slug: "kamancheh",
          title: "Lori Kamancheh",
          price: 10000000,
          description: "A Super Professional lori's Kamancheh Made Of Walnut Wood",
          inventory: 10,
          category_id: theMusicsCategory[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    )

    const [theHomeAppliancesCategory] = await queryInterface.sequelize.query(`
      SELECT id FROM tbl_categories WHERE slug = "home_appliances"
    `)
    await queryInterface.bulkInsert("tbl_products",
      [
        {
          id: uuidV4(),
          slug: "coffee_maker",
          title: "The Delonghi Coffee Maker",
          price: 32000000,
          description: "A High Quality, Beautifully Designed Coffee Maker From The DeLonghi Brand",
          inventory: 10,
          category_id: theHomeAppliancesCategory[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_products", null, {})
  }
}
