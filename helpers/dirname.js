import path from 'path';
import { fileURLToPath } from 'url';

const returnDirName = () => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename);
    console.log("__dirname: ", __dirname);

    return __dirname
}

export default returnDirName