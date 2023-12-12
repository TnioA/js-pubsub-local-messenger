import { PubSub } from '@google-cloud/pubsub';
import { checkExistsOrCreateSubscription } from './src/helpers/subscriptionHelper.js';

const pubsubClient = new PubSub();
const subscriptionName = 'consumeUserData';
const timeout = 60;

let messageCount = 0;

async function startConsumerApplication() {
    await checkExistsOrCreateSubscription(pubsubClient, subscriptionName);

    const subscription = pubsubClient.subscription(subscriptionName);

    subscription.on(`message`, messageHandler);
    setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount} message(s) received`);
    }, timeout * 1000);
}

const messageHandler = async message => {
    console.log(`message received ${message.id}`);
    console.log(`Data: ${message.data}`);

    messageCount += 1;

    console.log(`message ${message.id} proccessed successfuly`);
    console.log(``);
    // const messageBody = JSON.parse(message.data);
    // if(!messageBody.resolve)
    //     return message.nack();

    return message.ack();
};

startConsumerApplication();