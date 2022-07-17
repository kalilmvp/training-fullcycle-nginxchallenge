const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
let people = []

// caso nao exista tabela people, criar
// connect to the MySQL server
function main() {
  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    let createTablePeople = `create table if not exists people(
                            id int primary key auto_increment,
                            name varchar(255)not null
                        )`;
  
    connection.query(createTablePeople, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
  
    // insert people here
    insert();
    //for now its not necessary to close the connection
    /* connection.end(function(err) {
      if (err) {
        return console.log(err.message);
      }
    }); */
  });
}

function insert() {
  // insert people here
  var random_name = require('node-random-name');
  const name = random_name();
  const insertQuery = `insert into people(name) values('${name}')`
  connection.query(insertQuery, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    } else {
      people.push(name)
    }
  });
}

app.get('/', (req,res) => {
  setTimeout(() => {
    let html = '';
    html += '<h1>Full Cycle</h1>'
    html += 'Lista de nomes cadastrada no banco de dados.'
    html += '<ul>'
    people.forEach(pe => {
      html += `<li>${pe}</li>`
    })
    html += '</ul>'

    html += '<br/><br/>'
    html += '<form action="/add">'
    html += '<button type="submit">Add another people</button>'
    html += '</form>'

    res.send(html)
  }, 100);
})

app.get('/add', (req,res) => {
  insert();
  
  setTimeout(() => {
    let html = '';
    html += '<h1>Full Cycle</h1>'
    html += 'Lista de nomes cadastrada no banco de dados.'
    html += '<ul>'
    people.forEach(pe => {
      html += `<li>${pe}</li>`
    })
    html += '</ul>'

    html += '<br/><br/>'
    html += '<form action="/add">'
    html += '<button type="submit">Add another people</button>'
    html += '</form>'
    res.send(html);
  }, 100);
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

main();