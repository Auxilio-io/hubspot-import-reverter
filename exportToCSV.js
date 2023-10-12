const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

function exportToCSV(data, filePath) {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'id', title: 'id' },
      { id: 'document_d_identification', title: 'document_d_identification' },
    ],
  });

  csvWriter
    .writeRecords(data)
    .then(() => {
      console.log('CSV file has been written successfully');
    })
    .catch((error) => {
      console.error('Error writing CSV file:', error);
    });
}

module.exports = exportToCSV;
