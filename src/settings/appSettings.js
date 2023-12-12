import dotenv from 'dotenv';
dotenv.config();

export default new class AppSettings {
    PubsubHost = process.env.PUBSUB_EMULATOR_HOST;
    PubsubProjectId = process.env.PUBSUB_PROJECT_ID;
    PubsubTopic = process.env.PUBSUB_TOPIC;
}