import multer from 'multer';
import path from 'path';
import returnDirName from '../helpers/dirname.js'

export default{
    storage: multer.diskStorage({
        destination: path.resolve(`${returnDirName}'../../uploads`),
        filename: (req, file, callback) => {
            const extension = path.extname(file.originalname);
            const name = path.basename(file.originalname, extension);

            callback(null, `${name}-${Date.now()}${extension}`)
        }
    })
}