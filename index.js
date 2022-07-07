import express, { request, response } from 'express';
import { StatusCodes } from 'http-status-codes';
const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    { id: 1, name: 'Antonio', age: 44},
    { id: 2, name: 'Tatiane', age: 38},
   

];

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Servido rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express teste.<h1>');
});

app.get("/users", (request, response) => {
    return response.send(users);
});

//Pegar um determinado usuario
app.get("/users/:userId", (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number (userId))
    })

    return response.send(user);
});

//Inserir um novo usuario
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

//Atualizar o recurso
app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }

        return user;
    });

    return response.send(updatedUser);

});

//Remove um recurso
app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => userId !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});


