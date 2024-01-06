const axios = require('axios');

const urlApi = "https://digimon-api.vercel.app/api/digimon";

const resolvers = {
    Query: {
       

       

        levels: () => {
            const apiResponse = axios.get(urlApi).then(async resp => {
                var levels = []
                resp.data.map(data => {
                    if (levels.includes(data.level)) {
                        levels = levels.filter((level) => level.level != data.level)
                    } else {
                        levels.push(data.level)
                    }
                })

                return  levels;

            });

            return apiResponse;
        },
    },



};

module.exports = { resolvers };
