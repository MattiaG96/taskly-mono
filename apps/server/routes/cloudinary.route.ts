import express from 'express';
import { verifyToken } from '../lib/middleware';
import { addImage } from '../controllers/cloudinary.controller';

const cloudinaryRouter = express.Router();

cloudinaryRouter.post('/upload', verifyToken, addImage);

export default cloudinaryRouter;
