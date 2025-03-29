const db = require('../db');

const PreOrderController = {
  createPreOrder: (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const preOrder = { user_id, product_id, quantity };

    db.query('INSERT INTO pre_orders SET ?', preOrder, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ id: result.insertId, ...preOrder });
    });
  },

  getPreOrders: (req, res) => {
    const { user_id } = req.query;
    let query = 'SELECT * FROM pre_orders';
    const params = [];

    if (user_id) {
      query += ' WHERE user_id = ?';
      params.push(user_id);
    }

    db.query(query, params, (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    });
  },

  getPreOrder: (req, res) => {
    const { pre_order_id } = req.params;

    db.query('SELECT * FROM pre_orders WHERE id = ?', pre_order_id, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send('Pre-order not found');
      res.send(results[0]);
    });
  },

  cancelPreOrder: (req, res) => {
    const { pre_order_id } = req.params;

    db.query('UPDATE pre_orders SET status = "キャンセル" WHERE id = ?', pre_order_id, (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Pre-order not found');
      res.send({ id: pre_order_id, status: 'キャンセル' });
    });
  },

  updatePreOrderStatus: (req, res) => {
    const { pre_order_id } = req.params;
    const { status } = req.body;

    db.query('UPDATE pre_orders SET status = ? WHERE id = ?', [status, pre_order_id], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Pre-order not found');
      res.send({ id: pre_order_id, status });
    });
  },
};

module.exports = PreOrderController;