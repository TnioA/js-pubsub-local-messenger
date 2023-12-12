import { PubSub } from '@google-cloud/pubsub';
import { checkExistsOrCreateTopic } from './src/helpers/topicHelper.js';
import appSettings from './src/settings/appSettings.js';

const pubsubClient = new PubSub();

const data = JSON.stringify({
  "userId": "50001",
  "companyId": "acme",
  "companyName": "Acme Company",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@acme.com",
  "country": "US",
  "city": "Austin",
  "status": "Active",
  "effectiveDate": "11/11/2021",
  "department": "sales",
  "title": "Sales Lead",
  "resolve": false
});

async function publishMessage() {
  const dataBuffer = Buffer.from(data);

  await checkExistsOrCreateTopic(pubsubClient);

  try {
    const messageId = await pubsubClient.topic(appSettings.PubsubTopic).publish(dataBuffer);

    console.log(`Message ${messageId} published`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

publishMessage();