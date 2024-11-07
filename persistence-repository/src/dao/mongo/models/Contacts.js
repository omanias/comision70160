import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact
