import ApiError from "../error/Error.js";

export default function errorHandler(err, req, res, next) {
    // Проверяем, является ли ошибка экземпляром ApiError
    if (err instanceof ApiError) {
        // Если да, отправляем клиенту JSON с соответствующим статусом и сообщением ошибки
        return res.status(err.status).json({ message: err.message });
    }

    // Если ошибка не является экземпляром ApiError, отправляем общее сообщение об ошибке с кодом 500
    return res.status(500).json({ message: 'Упс! Непредвиденная ошибка!' });
}
