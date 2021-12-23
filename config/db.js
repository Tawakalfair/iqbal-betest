import mongoose from 'mongoose';
import redis from 'redis';

const dbName = "db_iqbal_bootest";

function mongoDb() {
    mongoose.connect(`mongodb://${process.env.HOSTMONGO}:${process.env.PORTMONGO}/${dbName}`);
    const db = mongoose.connection;
    db.on('error', (error)=> console.error(error));
    db.once('open', () => console.log('Database Connected'));
    return db;
}

function redisDb() {
    const rc = redis.createClient({
        host : process.env.HOSTREDIS,
        port : process.env.PORTREDIS
    });

    rc.on("error", (err) => {
        console.log('error redis =>', err);
    });

    return rc;
}

export { mongoDb as db, redisDb as redis }