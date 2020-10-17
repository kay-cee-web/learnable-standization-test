const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;



// removing all deprecationwarning for validations
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//validate that all required fields are filled out
const AdminSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name field is required']
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
            type: String,
            required: [true, 'Password is required']
    },
   
})


//encrypting password before sending to database
//before sending details to database
AdminSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
        try {
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            this.password = await bcrypt.hash(this.password, salt);
            return next();
        } catch (err) {
          return next(err);
        }
  });
  
  AdminSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };

const Admin = mongoose.model('admin', AdminSchema);


module.exports = Admin;