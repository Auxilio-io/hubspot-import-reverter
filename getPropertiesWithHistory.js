const axios = require('./axiosModule.js');

function getPropertiesWithHistory(token,contactsIdsSample) {
    const options = {
        method: "POST",
        url: "https://api.hubapi.com/crm/v3/objects/contacts/batch/read",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        data: {
            "inputs": contactsIdsSample,
            "properties": ["document_d_identification"],
            "propertiesWithHistory": ["document_d_identification"]
        }
    };

    return axios(options)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

module.exports = getPropertiesWithHistory;
