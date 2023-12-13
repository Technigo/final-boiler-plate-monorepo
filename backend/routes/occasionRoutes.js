import express from 'express';
import Restaurant from '../models/restaurantModel.js'; 

const router = express.Router();

router.get('/occasions', async (req, res) => {
    try {
      const occasions = await Restaurant.find().distinct('occasion');
      res.json(occasions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;

  //To be remodeled with real endpoints!!!!! the user should only be able to pick one occasion