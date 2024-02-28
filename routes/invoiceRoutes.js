const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// GET /api/invoices
router.get('/', invoiceController.getAllInvoices);

// POST /api/invoices
router.post('/', invoiceController.createInvoice);

// GET /api/invoices/:id
router.get('/:id', invoiceController.getInvoiceById);

// PUT /api/invoices/:id
router.put('/:id', invoiceController.updateInvoice);

// DELETE /api/invoices/:id
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;