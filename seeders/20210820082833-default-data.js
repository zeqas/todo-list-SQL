'use strict'
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    // queryInterface.bulkInsert 大量資料寫入
    return queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      // bcrypt.hashSync 是 bcrypt.hash 的同步版本
      password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10), null),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
      .then(userId => queryInterface.bulkInsert('Todos',
        Array.from({ length: 10 }).map((_, i) =>
        ({
          name: `name-${i}`,
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        ), {}))
  },
  down: (queryInterface, Sequelize) => {
    // queryInterface.bulkDelete 多筆資料刪除
    return queryInterface.bulkDelete('Todos', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}))
  }
}