import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});
contactSchema.set('timestamps', true); // Adds create_at and updated_at timestamps

export default mongoose.model('contact', contactSchema);