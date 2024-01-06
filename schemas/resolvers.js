const axios = require('axios');

const urlApi = "https://digimon-api.vercel.app/api/digimon";

const resolvers = {
    Query: {
        characters: (parent, args) => {
            let { first, after } = args;
            if (first < 0) throw new Error("first  debe ser mayor a 0");

            const apiResponse = axios.get(urlApi).then(async resp => {

                const data = resp.data;
                let paginationResult;
                let lastIndexData;
                let firstIndexData;
                let filterIndexStart = 0;


                if (after) {
                    after = after.toUpperCase().trim();
                    filterIndexStart = data.findIndex(character => character.name.toUpperCase() === after);
                    if (filterIndexStart < 0) throw new Error("No se econtro al personaje enviado en la paginacion (after)");
                    filterIndexStart++;

                }

                paginationResult = data.slice(filterIndexStart, (filterIndexStart + first));
                lastIndexData = data.findIndex(character => character.name.toUpperCase() === paginationResult[(paginationResult.length - 1)].name.toUpperCase());
                firstIndexData = data.findIndex(character => character.name.toUpperCase() === paginationResult[0].name.toUpperCase());


                const res = {
                    edges: paginationResult.map((character) => ({
                        cursor: character.name.toUpperCase(),
                        node: character,
                    })),
                    pageInfo: {
                        hasNextPage: lastIndexData < (data.length - 1),
                        hasPreviousPage: firstIndexData != 0,
                        showing: paginationResult.length,
                        total: data.length,
                        after: after

                    },
                }


                return  res;



            });


            return apiResponse;
        },

        charactersByFilter: (parent, args) => {

            //Format Arguments 
            for (let clave in args) {
                if (args[clave] === '') {
                    delete args[clave];
                } else {
                    args[clave] = args[clave].toUpperCase().trim();
                }
            }

            if (args.length<1) throw new Error("Debe de ingresar por lo menos un parametro de busqueda");

           
            // get data
            const apiResponse = axios.get(urlApi).then(async resp => {
                const items = resp.data;

                function filterItemsByCriteria(items, filters) {
                    return items.filter(item => {
                        return Object.keys(filters).every(key => {
                            if (typeof item[key] !== 'undefined') {
                                if (Array.isArray(filters[key])) {
                                    return filters[key].includes(item[key].toUpperCase().trim());
                                } else {
                                    return item[key].toUpperCase().trim() === filters[key];
                                }
                            }
                            return false;
                        });
                    });
                }

                return await  filterItemsByCriteria(items, args);;
            });

            return apiResponse;
        },

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
