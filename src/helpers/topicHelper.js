import appSettings from '../settings/appSettings.js';

async function createTopic(pubsubClient) {
    await pubsubClient.createTopic(appSettings.PubsubTopic);
    console.log(`::: Topic ${appSettings.PubsubTopic} created. :::`);
}

export async function checkExistsOrCreateTopic(pubsubClient) {
    const topics = await pubsubClient.getTopics();
    const topicExists = topics[0].find((topic) => topic.name === `projects/${appSettings.PubsubProjectId}/topics/${appSettings.PubsubTopic}`);
    if (!(topics && topicExists))
        return await createTopic();
}