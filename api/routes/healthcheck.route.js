import express from 'express';
const router = express.Router();
const path = '/healthz';

router.route('/')
    .get(async (req, res)=>{
      try {
        res.status(200).send();
      } catch (e) {
        res.status(503).send();
      }
    });

export {
  router,
  path,
};