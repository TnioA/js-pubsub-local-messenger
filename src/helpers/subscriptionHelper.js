import appSettings from '../settings/appSettings.js';

async function createSubscription(pubsubClient, subscriptionName) {
    await pubsubClient.topic(appSettings.PubsubTopic).createSubscription(subscriptionName);
    console.log(`::: Subscription ${subscriptionName} created. :::`);
}

export async function checkExistsOrCreateSubscription(pubsubClient, subscriptionName) {
    const subscriptions = await pubsubClient.getSubscriptions();
    const subscriptionExist = subscriptions[0].find((sub) => sub.name === `projects/${appSettings.PubsubProjectId}/subscriptions/${subscriptionName}`);
    if (!(subscriptions && subscriptionExist))
        return await createSubscription().catch(console.error);
}