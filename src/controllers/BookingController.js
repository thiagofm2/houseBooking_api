import Booking from '../models/Booking.js';
import House from "../models/House.js";
import User from '../models/User.js'

class BookingController{

    async index(req, res){
        const { user_id } = req.headers;
        const bookings = await Booking.find({ user: user_id });
        await bookings.populate('house');
        await bookings.populate('user');
        return res.json(bookings);
    }

    async store(req, res){
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        const house =  await House.findById(house_id);
        const user = await User.findById(user_id);

        if(!house){
            return res.status(400).json({error: 'Casa não encontrada.'})
        } 
        if(house.status === false){
            return res.status(400).json({error: 'Esta casa já está reservada.'})
        }
        if(String(user._id) === String(house.user)){
            return res.status(401).json({error: 'Um usuário não pode fazer reserva em uma casa criada por si mesmo.'})
        }
        
        const booking =  await Booking.create({
            user: user_id,
            house: house_id,
            date: date
        })

        // await booking.populate('house').populate('user').execPopulate();
        await booking.populate('house');
        await booking.populate('user');


        return res.json(booking);
    }

    async destroy(req, res){
        const { id } = req.params;
        const { user_id } = req.headers;

        const booking =  await Booking.findById(id);
        const user = await User.findById(user_id);

        if(!booking){
            return res.status(404).json({error:'Não foi encontrado reserva.'})
        }
        if(String(user._id) !== String(booking.user)){
            return res.status(401).json({error: 'Somente o usuário responsável pode cancelar a autorização.'})
        }

        await Booking.findByIdAndDelete({_id: id})

        return res.json({ message: 'Reserva deletada.'});
    }
}

export default new BookingController();