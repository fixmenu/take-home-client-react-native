
export const createNewUser = (newUser) => {
    fetch('https://mywebsite.com/endpoint/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: newUser.username,
            email: newUser.email,
            password:newUser.password,
            role:newUser.role
        })
    })
    .then((response) => {
        return response.json()
    })
    .catch((error) => {
        console.log(error);
    })
}