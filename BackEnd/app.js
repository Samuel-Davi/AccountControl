const express = require('express')
const executaQuery = require('./dbconnect')
const cors = require('cors');
const app = express()
const port = 8081                   

app.use(cors());


app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Samuel Davi API</h1>')
})

app.get('/users', (req,res) => {
  let query = "select * from accounts.users";
  executaQuery(query, res);
})

app.get('/users/:id', (req, res) => {
  const {id} = req.params;
  let query = "select * from accounts.users where id = " + id;
  executaQuery(query, res);
})

const buscarExtrato = (id, res) => {
  let query = 'select * from accounts.extrato_conta where id_user = ' + id;
  executaQuery(query, res);
}

app.get('/users/:id/extrato', async (req,res) => {
  const {id} = req.params;
  const extrato = await buscarExtrato(id, res);
})

app.post('/users/:id/extrato', (req,res) => {
  const body = req.body;
  let defaul = 'default'
  console.log(body);
  let query = `insert into accounts.extrato_conta values(null, ${req.params.id}, '${body.tipo_transacao}', ${body.valor}, '${body.descricao}', ${body.saldo_apos_transacao},'${body.categoria}', default, default)`;
  
  executaQuery(query, res);
})

app.put('/users/:id/', (req, res) => {
  const body = req.body;
  console.log(body)
  let query = `update accounts.users set renda = ${body.renda} where id = ${req.params.id}`;
  executaQuery(query, res);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})