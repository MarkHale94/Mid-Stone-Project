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
    }
}
)