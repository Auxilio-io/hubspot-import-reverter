function retrieveOverwrittenData(propertiesWithHistory) {
    const formattedArray = [];
  
    for (const propertyWithHistory of propertiesWithHistory) {
      if (
        propertyWithHistory.properties.document_d_identification === 'reçu à la css directement' &&
        propertyWithHistory.propertiesWithHistory.document_d_identification
      ) {
        const history = propertyWithHistory.propertiesWithHistory.document_d_identification;
        if (history.length === 1) {
          formattedArray.push({
            id: propertyWithHistory.id,
            document_d_identification: '',
          });
        } else if (history.length > 1) {
          // Find the second most recent timestamp
          history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          const secondMostRecent = history[1];
          formattedArray.push({
            id: propertyWithHistory.id,
            document_d_identification: secondMostRecent.value,
          });
        }
      }
    }
  
    return formattedArray;
  }

  module.exports = retrieveOverwrittenData;