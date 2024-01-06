import HouseController from './controllers/HouseController.js';
import SessionController  from './controllers/SessionController.js';
import BookingController from './controllers/BookingController.js'
import DashboardController from './controllers/DashboardController.js';
import uploadConfig from '../config/upload.js';
import Router from 'express';
import multer from 'multer';

const routes = new Router();
const upload = multer(uploadConfig)

routes.get('/', (req, res) => {
    res.json({ok: true});
});

routes.post('/login', SessionController.store);

routes.post('/houses', upload.single('thumbnail'),  HouseController.store);
routes.get('/houses',  HouseController.index);
routes.put('/houses/:id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses/:id', HouseController.destroy)

routes.get('/dashboard', DashboardController.show);

routes.post('/booking/:house_id', BookingController.store);
routes.get('/booking', BookingController.index);
routes.delete('/booking/:id', BookingController.destroy);
export default routes;