require('dotenv').config();

const splitContactsIdsInSamples = require('./splitContactsIdsInSamples.js');
const getPropertiesWithHistory = require('./getPropertiesWithHistory.js');
const retrieveOverwrittenData = require('./retrieveOverwrittenData.js');
const exportToCSV = require('./exportToCSV.js');

const token = process.env.ACCESS_TOKEN;
const contactsIds = require('./contactsIds.json');
const sampleSize = 50;

const propertiesWithHistory = [];

async function revertImport() {
  const contactsIdsSamples = splitContactsIdsInSamples(contactsIds, sampleSize);

  const fetchPromises = contactsIdsSamples.map(async (contactsIdsSample) => {
    try {
      const response = await getPropertiesWithHistory(token, contactsIdsSample);
      Array.prototype.push.apply(propertiesWithHistory, response.results);
    } catch (error) {
      throw error;
    }
  });

  await Promise.all(fetchPromises);

  const overwrittenData = retrieveOverwrittenData(propertiesWithHistory);
  
  exportToCSV(overwrittenData, 'output.csv');

}

revertImport();
