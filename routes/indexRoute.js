import express from 'express'; 
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'play2HelpWorld3D', '3dRpg.html'));
})

export default router;