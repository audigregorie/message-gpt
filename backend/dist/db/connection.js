import { connect } from 'mongoose';
import { disconnect } from 'process';
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (err) {
        console.log(err);
        throw new Error('Cannot connect to MongoDB');
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (err) {
        console.log(err);
        throw new Error('Could not disconnect from MongoDB');
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map