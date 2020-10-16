import { Console } from 'console';
import { Application } from 'express';
import { Db, ObjectID } from 'mongodb';

const api: (app: Application, dbClient: Db) => void = (app: Application, dbClient: Db) => {

    app.get('/notes/:id', async (req, res) => {
        //get note by id
        dbClient.collection('notes').findOne({ _id: new ObjectID(req.params.id) }).then(value => {
            res.status(201).json(value);
        });
    });

    app.get('/notes', async (req, res) => {
        //get db here
        
        dbClient.collection('notes').find({}).toArray().then(values => {
            res.status(200).json(values);
        });
    });
    
    app.post('/notes', async (req, res) => {
        //create new note
        const { Text, Name } = req.body;
        dbClient.collection('notes').insertOne({ text: Text, name: Name }).then(value => {
            res.status(201).json(value.insertedId);
        });
    });

    app.put('/notes/:id', async (req, res) => {

        const update: {$set: {}} = {
            $set: {
                Text: req.body.Text,
                Name: req.body.Name
            }
        }

        dbClient.collection('notes')
            .findOneAndUpdate({ _id: new ObjectID(req.params.id) }, update)
            .then(ress => { 
                res.status(201).json(ress.value); 
            });
    });

    app.delete('/notes/:id', async (req, res) => {

        dbClient.collection('notes').findOneAndDelete({ _id: new ObjectID(req.params.id) }).then(() => {
            res.status(201).json({ success: true }); 
        });
    });
    

    //put update note 
};

export default api;