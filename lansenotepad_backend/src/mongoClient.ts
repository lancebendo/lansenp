import { MongoClient } from 'mongodb';

const connectionString: string = 'mongodb://lancebendo:tmackulet1@ds239359.mlab.com:39359/lansenotepaddb';

const mongoClient:  () => Promise<MongoClient> = () => MongoClient.connect(connectionString, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });

export default mongoClient;