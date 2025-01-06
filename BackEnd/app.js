const express = require('express')
const executaQuery = require('./dbconnect')
const cors = require('cors');
const app = express()
const port = 8080

app.use(cors());


app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Samuel Davi</h1>')
})

app.get('/users', (req,res) => {
  let query = "select * from accounts.User";
  executaQuery(query, res);
})

app.get('/users/extrato', (req,res) => {
  let query = 'select * from accounts.Extrato'
  executaQuery(query, res);
})

app.post('/users/inserirExtrato', (req,res) => {
  console.log(req.body)
  let name = req.body.username;
  let valor = req.body.valor;
  let optionValue = req.body.optionValue;
  let desc = req.body.desc;
  let formaPag = req.body.formaPag;
  let query = `insert into accounts.Extrato(username, valor, optionValue, descr, formaPag, User_name)
  values('${name}', '${valor}', '${optionValue}', '${desc}', '${formaPag}', '${name}')`;
  
  executaQuery(query, res);
})

app.post('/users/updateData', (req, res) => {
  console.log(req.body)
  let username = req.body.username;
  let dinheiro = req.body.dinheiro;
  let pix = req.body.pix;

  let query = `update User set dinheiro = '${dinheiro}', pix = '${pix}',
  rendaTotal = '${dinheiro}' + '${pix}' where username = '${username}'`

  executaQuery(query, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})