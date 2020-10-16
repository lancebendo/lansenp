import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

import mongoClient from './mongoclient';
import api from './api';


mongoClient().then((c: MongoClient) => {
   console.log('Connection to database is successful.')
   
   const app = express();
   const db = c.db();

   app.use(cors({
      origin: '*', //baguhin natin to pag nasetup na yung homeserver.
      credentials: true,
   }));

   app.use(express.urlencoded({ extended: false }));
   app.use(express.json());

   api(app, db);

   app.listen(3100, () => console.log('Backend is in port 3100.'));
});
