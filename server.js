const express = require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || 8080;

const teams = [];
var iTeam = 0;

app.post('/team', (req,res) => {
    if(req.body.matches != null) {
        teams.push({
            "id": iTeam,
            "name": req.body.name,
            "is_still_in": req.body.is_still_in,
            "matches": [JSON.parse(req.body.matches)]
        });
    } else{
        teams.push({
            "id": iTeam,
            "name": req.body.name,
            "is_still_in": req.body.is_still_in,
            "matches": []
        });
    }
    iTeam++;
    res.json(teams);
});

app.get('/team/:id', (req,res) => {
    var x = req.params.id;
    var index = teams.findIndex(item => {return item.id == x});
    if(index != -1){
        res.status(200);
        res.json(teams[index]);
    }
    else{
        res.sendStatus(404);
    }
});

app.put('/team/:id', (req,res) => {
    var x = req.params.id;
    var index = teams.findIndex(item => {return item.id == x});
    if(index != -1){

        if(req.body.matches != null) {
            teams.push({
                "id": iTeam,
                "name": req.body.name,
                "is_still_in": req.body.is_still_in,
                "matches": [JSON.parse(req.body.matches)]
            });
        } else{
            teams.push({
                "id": iTeam,
                "name": req.body.name,
                "is_still_in": req.body.is_still_in,
                "matches": []
            });
        }
        res.status(203);
        res.json(teams[index]);
    }
    else{
        res.sendStatus(404);
    }
});

app.post('/match', (req,res) => {
    var x = req.body.id;
    var index = teams.findIndex(item => {return item.id == x});
    if(index != -1){
        teams[index].matches.push({'opponent': req.body.opponent, 'outcome': req.body.outcome})
        res.status(201);
        res.json(teams[index]);
    }
    else{
        res.sendStatus(404);
    }
});

app.get('/match/:id1/:id2', (req,res) => {
    var x = req.params.id1;
    var i = req.params.id2;
    var index = teams.findIndex(item => {return item.id == x});
    if(index != -1){
        const team = teams[index];
        const match = team.matches[i];
        result = {'Team': team.name, 'opponent': match.opponent, 'outcome': match.outcome};
        res.status(200);
        res.json(result);
    }
    else{
        res.sendStatus(404);
    }
});

app.put('/match/:id1/:id2', (req,res) => {
    var x = req.params.id1;
    var i = req.params.id2;
    var index = teams.findIndex(item => {return item.id == x});
    if(index != -1){

        teams[index].matches[i] = {'opponent': req.body.opponent, 'outcome': req.body.outcome};
        res.status(203);
        res.json(teams[index]);
    }
    else{
        res.sendStatus(404);
    }
});

app.listen(port);
console.log("Listen to port "+port);
