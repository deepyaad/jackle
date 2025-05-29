import { Schema, model} from mongoose;


// im doing the online store application, so it'll just be buyers and sellers
const UserSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    roles: [{ type: String, enum: ['buyer', 'seller']}]
}, {timestamps: true}); // timestamps could help with debugging



// TODO: need to implement and test CRUD operations


module.exports = model('User', UserSchema);