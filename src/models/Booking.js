import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
    date: String,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    house:{
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});

export default model('Booking', BookingSchema);