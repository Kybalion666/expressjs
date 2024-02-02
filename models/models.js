import sequelize from "../database.js";
import { DataTypes } from "sequelize";

 const User =  sequelize.define('user', { // пользователь 
        id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true}, // тип поля числовой, первичный ключ , autoIncriment(увелечения ид с каждым новым полем - 1.2.3.4 и тд )
        })

const Basket =  sequelize.define('basket', { // корзина 
        id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true}  
        })

const BasketProduct =  sequelize.define('basketproduct', { // товары в корзине  
        id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true} 
        })


const Product =  sequelize.define('product', { // товары 
        id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true}, 
        name:{type:DataTypes.STRING,unique:true,allowNull:false},
        price:{type:DataTypes.INTEGER,allowNull:false},
        img:{type:DataTypes.STRING,allowNull:false}
        })

 const ProductInfo =  sequelize.define('productinfo', { // товары в корзине  
         id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
         title:{type:DataTypes.STRING,unique:true,allowNull:false}, // 
 })
 const Customer = sequelize.define('customer', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        clientName:{type:DataTypes.STRING,unique:false,allowNull:true},
        phoneNumber: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        comments: { type: DataTypes.TEXT }
    });


  User.hasOne(Customer);
  Customer.belongsTo(User);

  User.hasOne(Basket) // one to one 
  Basket.belongsTo(User)

  Basket.hasMany(BasketProduct)
  BasketProduct.belongsTo(Basket)

  Product.hasMany(BasketProduct)
  BasketProduct.belongsTo(Product)

  Product.hasMany(ProductInfo,{as: 'info'})
  ProductInfo.belongsTo(Product)

  const models = {
   Customer,
    User,
    Basket,
    BasketProduct,
    Product,
    ProductInfo
  }
  export default models;
  