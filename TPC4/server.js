var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


var server = http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

      // Handling request
      if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else {
        switch(req.method){
            case "GET": {
                // GET /alunos --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tarefas")){
                    axios.get("http://localhost:3000/tarefas")
                        .then(response => {
                            console.log(tarefas)
                            var tarefas = response.data
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.tarefaspage(tarefas, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == "/alunos/registo"){
                    // Add code to render page with the student form
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    // res.write(studentFormPage(d))
                    res.end('<p>Yet to be done... </p>')
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            }

            case "POST":{
                if(req.url == "/"){
                    collectRequestBodyData(req, task => {
                        if(task){
                            task["done"] = "no"
                            // console.log(task)
                            axios.post("http://localhost:3000/tarefas",task)
                            .catch(erro => {
                                console.log("Erro: "+ erro)
                                res.writeHead(201,{'Content-Type': 'text/html; charset=utf-8'})
                                res.end("ERRO: "+ erro)
                            })   
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                } else if (req.url == "/delete"){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.log(result)
                            axios.delete("http://localhost:3000/tarefas/"+ result.id)
                            .catch(erro => {
                                console.log("Erro: "+ erro)
                                res.writeHead(201,{'Content-Type': 'text/html; charset=utf-8'})
                                res.end("ERRO: "+ erro)
                            })   
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if (req.url == "/complete"){
                    collectRequestBodyData(req, task => {
                        if(task){
                            console.log(task)
                            axios.put(`http://localhost:3000/tarefas/${task.id}`,task)
                            .catch(erro => {
                                console.log("Erro: "+ erro)
                                res.writeHead(201,{'Content-Type': 'text/html; charset=utf-8'})
                                res.end("ERRO: "+ erro)
                            })   
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                
                               
                break
                
            }

            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
        
            


        }
    
    
})

server.listen(8081, ()=>{
    console.log("Servidor à escuta na porta 8081...")
})
