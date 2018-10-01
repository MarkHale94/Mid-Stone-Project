const remoteURL = "http://localhost:8088"

export default Object.create(null, {
    //goes to the json server and adds an object using the key provided
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
        //goes to the json server and removes an object using the key and the id number for that object
        remove: {
            value: (key, id) => {
                return fetch(`${remoteURL}/${key}/${id}`, {
                    method: "DELETE"
                }).then(result => result.json())
            }
        },
        //goes to the json server and uses the key and id number and updates the object using a put method. can't use the patch method because of cors issues associated with it that would prevent access to the giantbomb database.
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
        //goes to the json server and takes a key and a user id and uses that to get all of the games in that specific user's collection.
        getUsersCollection: {
            value: (key, userId) => {
                return fetch(`${remoteURL}/${key}/?userId=${userId}`)
                .then(result => result.json())
                },
            },
        //goes to the json server and takes a key and a user id and uses that to get all of the categories that the specific user has saved.
        getUserCategories: {
            value: (key, userId) => {
                return fetch(`${remoteURL}/${key}/?userId=${userId}`)
                .then(result => result.json())
                },
            },
        //goes to the json server and collects all of the user data for login verification purposes
        getAllUsers: {
            value: () => {
                return fetch(`${remoteURL}/users`)
                .then(result => result.json())
                },
            },
        //goes to the giantbomb api using my api key to do a search for a game using the search criteria provided by the user from the search bar
        search: {
            value: (searchTerm) =>
                {
                    return fetch(`https://www.giantbomb.com/api/search/?api_key=3d002b8b6d1455fbeca66da0e5ce03a9450cb19b&format=json&limit=200&query="${searchTerm}"&resources=game`)
                    .then(result => result.json())
                }
        },
        //goes to the giantbomb api using my api key and does a more specific search for the game details that aren't provided in the more generic search. This uses the specific game url provided from the broader search done above.
        specificGameSearch: {
            value: (gameSpecificURL) =>
            {
                return fetch(`${gameSpecificURL}?api_key=3d002b8b6d1455fbeca66da0e5ce03a9450cb19b&format=json&limit=200`)
                .then(result => result.json())
            }
        }
    }
)
