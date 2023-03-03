var http = require('http')
var url = require('url')
var fs = require('fs')
const axios = require('axios')
var mypages = require('./mypages')
var usrpage = require('./personpage')
var gndrpage = require('./genderpage')
var sprtpage = require('./desportopage')
var profpage = require('./profissoes')

http.createServer(function(req,res){
    // var d = new Date().toISOString.substring(0,16)
    console.log(req.method + " " + req.url) //+ " " + d)

    var dicURL = url.parse(req.url, true)
    //console.log(dicURL)

    if (dicURL.pathname == "/"){
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html;'})
            if(err){
                console.log("Erro na leitura da pagina de index")
                res.write("Erro: " + err)
            }
            else res.write(data)
            res.end()
        })
    }
   
  
    else if (dicURL.pathname == "/people"){
        axios.get("http://localhost:3000/pessoas/?_sort=nome&order=asc")
            .then(function(response){
                var pessoas = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.peoplePages(pessoas))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (dicURL.pathname.substring(0,"/people/p".length)=="/people/p"){
       id= dicURL.pathname.substring("/people/p".length-1) 
       //
       axios.get("http://localhost:3000/pessoas/"+id)
            .then(function(response){
                var pessoa = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(usrpage.personpage(pessoa))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (dicURL.pathname == "/sports"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(response){
                var pessoas = response.data

                var dict = {}
                const sortedObj = {};
                for (i=0;i<pessoas.length;i++){

                    var listsports = pessoas[i].desportos
                    var aux=[]
                    var pos=0
                    for (k=0;k<listsports.length;k++){
                        if(!dict[listsports[k]]){
                            dict[listsports[k]]=1
                            aux[pos]=listsports[k]
                            pos++
                        }
                        else {
                            if (!aux.includes(listsports[k]))
                            dict[listsports[k]]++
                            aux[pos]=listsports[k]
                            pos++
                            
                        }

                        
                        
                    }
                }
                const sortedPairs = Object.entries(dict).sort((b, a) => a[1] - b[1]);

                for (let i = 0; i < sortedPairs.length; i++) {
                const [key, value] = sortedPairs[i];
                sortedObj[key] = value;
                }


                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(sprtpage.sports(sortedObj))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (dicURL.pathname == "/gender"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(response){
                var pessoas = response.data

                 var dict = {}
                 for (i=0;i<pessoas.length;i++){

                    if(!dict[pessoas[i].sexo]){

                        dict[pessoas[i].sexo]=1
                    }
                    else dict[pessoas[i].sexo]++
                 }

                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(gndrpage.gender(dict))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (dicURL.pathname == "/jobs"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(response){
                var pessoas = response.data

                 var dict = {}
                 const sortedObj = {};
                 for (i=0;i<pessoas.length;i++){

                    if(!dict[pessoas[i].profissao]){

                        dict[pessoas[i].profissao]=1
                    }
                    else dict[pessoas[i].profissao]++
                 }

                const sortedPairs = Object.entries(dict).sort((b, a) => a[1] - b[1]);

                for (let i = 0; i < sortedPairs.length; i++) {
                const [key, value] = sortedPairs[i];
                sortedObj[key] = value;
                }
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(profpage.jobs(sortedObj))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
      else if (dicURL.pathname.startsWith("/jobs/")){
            var profissao= decodeURIComponent(dicURL.pathname.substring(6,) )
            
            axios.get("http://localhost:3000/pessoas/?profissao="+profissao)
                 .then(function(response){
                     var pessoas = response.data
                     res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                     res.end(mypages.peoplePages(pessoas))
                 })
                 .catch(erro => {
                     console.log("Erro: "+ erro)
                     res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                     res.end("ERRO: "+ erro)
                 })   
         }
         else if (dicURL.pathname.startsWith("/sports/")){
            var desporto= decodeURIComponent(dicURL.pathname.substring(8,) )
            axios.get("http://localhost:3000/pessoas")
            .then(function(response){
                var pessoas = response.data
                var k =[]
                var m=0;
                
                for (i=0;i<pessoas.length;i++) {
                    
                    if (pessoas[i].desportos.includes(desporto)){
                        //console.log(pessoas[chave])
                        k[m] = pessoas[i];
                        m++;
                    }
                  }
                  
                  
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.peoplePages(k))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
         }
    else if (dicURL.pathname == "/masculino"){
        axios.get("http://localhost:3000/pessoas/?sexo=masculino")
            .then(function(response){
                var pessoas = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.peoplePages(pessoas))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (dicURL.pathname == "/feminino"){
        axios.get("http://localhost:3000/pessoas/?sexo=feminino")
            .then(function(response){
                var pessoas = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.peoplePages(pessoas))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (dicURL.pathname == "/outro"){
        axios.get("http://localhost:3000/pessoas/?sexo=outro")
            .then(function(response){
                var pessoas = response.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.peoplePages(pessoas))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+ erro)
            })   
    }
    else if (dicURL.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/css;'})
            if(err){
                console.log("Erro na leitura da stylesheet")
                res.write("Erro: " + err)
            }
            else res.write(data)
            res.end()
        })
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'})
        res.end("ERRO: Operação não suportada")
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")