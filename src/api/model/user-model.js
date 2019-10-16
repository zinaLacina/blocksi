import mongoose from 'mongoose';
import { StringUtil } from '../utilities/string-util';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    password: String
});
userSchema.set('timestamps', true);

// Returns a transient field client-side without actually adding it to the schema
userSchema.virtual('fullName').get(function() {
    const firstName = StringUtil.capitalize(this.firstName.toLowerCase());
    const lastName = StringUtil.capitalize(this.lastName.toLowerCase());
    return `${firstName} ${lastName}`;
});

// Static methods that can be called from anywhere (e.g., User.passwordMatches)
userSchema.statics.passwordMatches = function(password, hash) {
    return bcrypt.compareSync(password, hash);
}
// Runs validation before saving a user
userSchema.pre('save', function(next) {
    this.email = this.email.toLowerCase();
    this.firstName = this.firstName.toLowerCase();
    this.lastName = this.lastName.toLowerCase();
    const unsafePassword = this.password;
    this.password = bcrypt.hashSync(unsafePassword); // Will encrypt the user's password
    next();
});

export default mongoose.model('user', userSchema);