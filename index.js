import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import express from 'express'
import cors from'cors'
import sequelize from './database.js';
import router from './routes/main.js';
import models from './models/models.js';
import errorHandler from './middleware/errorMiddleware.js';
import fileUpload from 'express-fileupload';
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import path from 'path'

//ExpressServer
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const app = express()
const PORT = 5000
app.use(express.json());
app.use(fileUpload({}))
app.use(cors())
app.use(express.static(path.resolve(__dirname,'static')))
app.use('/api',router)


app.use(errorHandler)

app.get('/',(req,res) => {
    res.status(200).json('working')
})
const serverStart = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter:true});
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};



serverStart();



//TelegrammBot

const webAppUrl = 'https://6552-82-215-108-49.ngrok-free.app';
const token ='6708896074:AAECo-sU1KRPvZrfy6O2Z-fW8sKANRuPktc';
const bot = new TelegramBot(token, { polling: true });


 const start = () => {
    bot.setMyCommands([
        {command:'/start',description:'Запуск бота'},
        {command:'/admin',description:'Администраторский раздел'}
        
    ])
    bot.on('message', async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;
        
       await bot.sendMessage(chatId, 'Добро пожаловать в наш онлайн ресторан! Для просмотра меню и оформления заказа перейдите в нужный раздел  по кнопке ниже', {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Меню',
                            web_app:{url:webAppUrl}
                        }
                    ]
                ],
                resize_keyboard: true // Добавлен параметр resize_keyboard для корректного отображения клавиатуры
            }
        });

        if (msg?.web_app_data?.data) {
            try {
                const data = JSON.parse(msg?.web_app_data.data);
                console.log(data);
        
                const orderItems = data.selectedProductNames.map((name, index) => (
                    `${name} x${data.selectedProductQuantity[index]}шт.`
                )).join('\n------------------------\n');
        
                bot.sendMessage(chatId, `${data.clientName}, спасибо за оформление заявки!`);
                
                bot.sendMessage(chatId, `<b>Ваш заказ:</b>\n${orderItems}`+
                                         '\n-----------------------------\n' +
                                         '<b>Итог</b>'+ 
                                         data.getBasketTotal, { parse_mode: 'HTML' });

                bot.sendMessage(chatId, '<b>Ваши данные:</b>\n' +
                                         '<u>Имя:</u> ' + data.clientName + '\n' +
                                         '<u>Адрес доставки:</u> ' + data.address + '\n' +
                                         '<u>Номер телефона:</u> ' + data.phoneNumber + '\n' + 
                                         '<u>Тип оплаты:</u>'      + data.selectedPayment 
                                         , { parse_mode: 'HTML' });
            } catch (e) {
                console.log(e);
            }
        }
    });

    
 }

 start()



