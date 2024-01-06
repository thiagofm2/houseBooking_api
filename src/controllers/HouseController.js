import House from "../models/House.js";
import User from '../models/User.js';
import * as Yup from 'yup'

class HouseController{

    async index(req, res){
        const { status } = req.query;
        const houses = await House.find({ status });
        
        return res.json(houses);
    }

    async store(req, res){
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });

        const { filename } = req.file;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Erro na validação. Verifique os campos."})
        }

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status
        });
        return res.json(house);
    }

    async update(req, res){
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });

        let photos;

        if(req.file){
            photos = req.file.filename
        }

        // const { filename } = req.file;
        const { description, price, location, status } = req.body;
        const { id } = req.params;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const house = await House.findById(id);

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Erro na validação. Verifique os campos."})
        }

        if(String(user._id) !== String(house.user)){
            return res.status(401).json({ error: 'Não autorizado.'});
        }

        await House.updateOne({ _id: id }, {
            user: user_id,
            thumbnail: photos,
            description,
            price,
            location,
            status
        })

        return res.json();
    }

    async destroy(req, res){
        const { id } = req.params;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const house = await House.findById(id);

        if(String(user._id) !== String(house.user)){
            return res.status(401).json({ error: 'Não autorizado.'});
        } else{
            await House.findByIdAndDelete({ _id: id});
            return res.json({ message: 'The item has been deleted.' })
        }

    }
}

export default new HouseController();