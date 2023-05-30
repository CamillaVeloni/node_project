const app = require('./app.js');
const db = require('./config/db.js');
const UserModel = require('./models/user.model.js');
const ProductModel = require('./models/product.model.js');

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port http:localhost:${process.env.PORT}`);
});