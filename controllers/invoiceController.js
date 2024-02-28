const Invoice = require('../models/Invoice');

exports.createInvoice = async (req, res, next) => {
    try {
        const { user, customer, products, totalAmount, invoiceNumber, invoiceDate } = req.body;
        const invoice = new Invoice({ user, customer, products, totalAmount, invoiceNumber, invoiceDate });
        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        next(error);
    }
};

exports.getInvoices = async (req, res, next) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is provided as a parameter
        
        // Find invoices for the specified user
        const invoices = await Invoice.find({ user: userId });
        res.json(invoices);
    } catch (error) {
        next(error);
    }
};

exports.updateInvoice = async (req, res, next) => {
    try {
        const invoiceId = req.params.id;
        const { user, customer, products, totalAmount, invoiceNumber, invoiceDate } = req.body;
        
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            invoiceId,
            { user, customer, products, totalAmount, invoiceNumber, invoiceDate },
            { new: true }
        );
        
        if (!updatedInvoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        
        res.json(updatedInvoice);
    } catch (error) {
        next(error);
    }
};


exports.getAllInvoices = async (req, res, next) => {
    try {
        // Extract the user ID from the authenticated user information stored in req.user
        const userId = req.user.userId;
        
        // Find invoices for the authenticated user
        const invoices = await Invoice.find({ user: userId });
        
        res.json(invoices);
    } catch (error) {
        next(error);
    }
};



exports.getInvoiceById = async (req, res, next) => {
    try {
        const invoiceId = req.params.id;
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        next(error);
    }
};

exports.deleteInvoice = async (req, res, next) => {
    try {
        const invoiceId = req.params.id;
        const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
        if (!deletedInvoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(deletedInvoice);
    } catch (error) {
        next(error);
    }
};
