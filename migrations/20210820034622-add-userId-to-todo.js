'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    // 新增欄位
    await queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false, // 必填
      // 設定關聯，如果有設定 references 時，MySQL 資料庫會追加一些限制跟連動，提高資料查詢與操作的速度與一致性
      references: { 
        model: 'Users',
        key: 'id'
      }
    })
  },
  down: async(queryInterface, Sequelize) => {
    // 刪除欄位
    await queryInterface.removeColumn('Todos', 'UserId')
  }
}
