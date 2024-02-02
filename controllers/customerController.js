import models from '../models/models.js';
import ApiError from '../error/Error.js';

export default class customerController {
    async create(req, res) {
        try {
            const { clientName, phoneNumber, address, comments } = req.body;
            
            // Валидация данных
            if (!clientName || !phoneNumber || !address) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const customer = await models.Customer.create({ clientName, phoneNumber, address, comments });
            return res.json(customer);
        } catch (error) {
            // Логирование ошибки
            console.error('Error creating customer:', error);

            // Возвращение более точного HTTP-статуса
            return res.status(500).json({ error: 'Failed to create customer' });
        }
    }

    async getAll(req, res) {
        try {
            const allCustomers = await models.Customer.findAll();
            return res.json(allCustomers);
        } catch (error) {
            console.error('Error fetching all customers:', error);
            return res.status(500).json({ error: 'Failed to fetch customers' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const oneCustomer = await models.Customer.findOne({ where: { id } });
            
            // Проверка наличия данных
            if (!oneCustomer) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            return res.json(oneCustomer);
        } catch (error) {
            console.error('Error fetching one customer:', error);
            return res.status(500).json({ error: 'Failed to fetch customer' });
        }
    }
}
