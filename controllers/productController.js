// Импорт модулей и зависимостей
import models from "../models/models.js";
import ApiError from "../error/Error.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Получение текущего пути и директории файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Экспорт контроллера продуктов
export default class ProductController { 
    // Метод для создания нового продукта
    async create(req, res, next) {
        // Инициализация переменной для имени файла
        let fileName = '';
        try {
            // Извлечение данных из запроса
            let { name, price, info } = req.body; 

            // Проверка наличия файла img в запросе
            if (req.files && req.files.img) {
                const { img } = req.files;

                // Генерация уникального имени файла
                fileName = uuidv4() + '.jpg';

                // Путь к файлу для сохранения
                const filePath = path.resolve(__dirname, '..', 'static', fileName);

                // Перемещение файла в указанный путь
                img.mv(filePath);

                // Дополнительная обработка файла img может быть добавлена здесь
            } else {
                // Если файл img не предоставлен, выбрасываем ошибку
                throw new Error("Файл img не был предоставлен в запросе.");
            }

            // Создание нового продукта в базе данных
            const product = await models.Product.create({ name, price, img: fileName });

            // Если предоставлена информация о продукте, добавляем ее в базу данных
            if (info) {
                info = JSON.parse(info);
                info.forEach(i => 
                    models.ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                );
            }

            // Возвращаем созданный продукт в качестве JSON-ответа
            return res.status(201).json(product);
        } catch (e) {
            // Обработка ошибок и передача ошибки в middleware
            next(ApiError.badRequest(e.message));
        }
    }

    // Метод для получения всех продуктов
    async getAll(req, res, next) {
        try {
            // Получение всех продуктов из базы данных
            const allProduct = await models.Product.findAll();

            // Возвращаем все продукты в качестве JSON-ответа
            return res.json(allProduct);
        } catch (error) {
            // Обработка ошибок и возврат сообщения об ошибке сервера
            console.error(error);
            return next(ApiError.internal("Internal Server Error"));
        }
    }

    // Метод для получения одного продукта по идентификатору
    async getOne(req, res) {
        // Извлечение идентификатора продукта из параметров запроса
        const { id } = req.params;

        // Поиск продукта по идентификатору в базе данных
        const oneProduct = await models.Product.findOne(
            {
                where: { id },
                include: [{ model: models.ProductInfo, as: 'info' }]
            }
        );

        // Возвращаем найденный продукт в качестве JSON-ответа
        return res.json(oneProduct);
    }
}
