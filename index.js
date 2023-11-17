const express = require('express');
const app = express();
// use fetch module
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// use body-parser module
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// declare single route for static files located in public folder
app.use(express.static('public'));

const data = [
    // generate some user objects
    { id: 1, name: 'John Doe'},
    { id: 1, name: 'Michel'}
]
// declare route for index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
//charger le fichier mp3
app.get('/m', (req, res) => {
  res.sendFile(__dirname +'/CleanGuitarRiff.mp3');
});


app.get('/api/users', async (req, res) => {
    let repJSON = await fetch("https://jsonplaceholder.typicode.com/users");
    let rep = await repJSON.json();

    res.json(rep);
});
app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    let repJSON = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
    let rep = await repJSON.json();

    res.json(rep);
});
app.post('/test', (req, res) => {
  console.log(req.body)
  res.json('Successful post')
})
app.post('/api/users', async (req, res) => {
    // print the body of the form received
    console.log(req.body);
    res.send('POST request to the homepage');
});
// Démarrer le serveur
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

