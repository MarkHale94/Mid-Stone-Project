const remoteURL = "http://localhost:8088"

export default Object.create(null, {
        add: {
            value: (key, object) =>
                {
                return fetch(`${remoteURL}/${key}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(object)
                })
                .then(result => result.json())
                }
        },
        remove: {
            value: (key, id) => {
                return fetch(`${remoteURL}/${key}/${id}`, {
                    method: "DELETE"
                }).then(result => result.json())
            }
        },
        edit: {
            value: (key, id, object) => {
                return fetch(`${remoteURL}/${key}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(object)
                })
                .then(result => result.json())
            }
        },
        getUsersCollection: {
            value: (key, userId) => {
                return fetch(`${remoteURL}/${key}/?userId=${userId}`)
                .then(result => result.json())
                },
            },

        search: {
            value: (searchTerm) =>
                {
                    return fetch(`https://www.giantbomb.com/api/search/?api_key=3d002b8b6d1455fbeca66da0e5ce03a9450cb19b&format=json&limit=200&query="${searchTerm}"&resources=game`)
                    .then(result => result.json())
                }
        },

        specificGameSearch: {
            value: (gameSpecificURL) =>
            {
                return fetch(`${gameSpecificURL}?api_key=3d002b8b6d1455fbeca66da0e5ce03a9450cb19b&format=json&limit=200`)
                .then(result => result.json())
            }
        }
    }
)
