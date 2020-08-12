const express = require('express');
//const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const python = require('child_process')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get('/testAjax',(req,res)=>{
    console.log("Ajax received")
    console.log(req.query)
    python.execFile('python3',['./scripts/main.py',req.query.master,req.query.ident,req.query.plateform,req.query.num],
        (err, stdout, stderr)=>{
            mdp = stdout.toString('utf8')
            console.log(mdp)
            res.send(200,mdp);
        });
})

app.listen(5000, () => console.log('App running on port 5000 🔥'));