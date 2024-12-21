import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;