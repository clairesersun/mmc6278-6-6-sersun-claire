const router = require('express').Router()
const db = require('../db')
const path = require('path')

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM inventory;')
  const [[{cartCount}]] = await db.query('SELECT SUM(quantity) AS cartCount FROM cart;')

  // TODO: Convert the response below to render a handlebars template
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/product/:id', async (req, res) => {
  const [[product]] = await db.query(
    'SELECT * FROM inventory WHERE id=?;',
    [req.params.id]
  )
  const [[{cartCount}]] = await db.query('SELECT SUM(quantity) AS cartCount FROM cart;')

  // TODO: Convert the response below to render a handlebars template
  res.sendFile(path.join(__dirname, '../views/product.html'))
})

router.get('/cart', async (req, res) => {
  const [cartItems] = await db.query(
    `SELECT
        cart.id,
        cart.inventory_id AS inventoryId,
        cart.quantity,
        inventory.price,
        ROUND(inventory.price * cart.quantity, 2) AS calculatedPrice,
        inventory.name,
        inventory.image,
        inventory.quantity AS inventoryQuantity
      FROM cart LEFT JOIN inventory ON cart.inventory_id=inventory.id`
  )
  // We could get the cart total with a separate SQL query,
  // but let's just use some JavaScript instead.
  const total = cartItems
    .reduce((total, item) => item.calculatedPrice + total, 0)
    .toFixed(2)

  // TODO: Convert the response below to render a handlebars template
  res.sendFile(path.join(__dirname, '../views/cart.html'))
})

module.exports = router
