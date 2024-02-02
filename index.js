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





