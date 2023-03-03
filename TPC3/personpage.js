exports.personpage = function(person){
    var htmlpage =`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>PersonPage </title>
        </head>
        <body>

            <div class="w3-card-4">

            <header class="w3-container w3-blue">
              <h1>ID:${person.id}  </h1>
              <a style="float:right;display: inline-block;" href ="http://localhost:7777/">  Voltar</a>
            </header>

            <div class="w3-container">  
            
            
            <p> ID:${person.id} </p>
            <p> Nome:${person.nome} </p>
            <p> Idade:${person.idade} </p>
            <p> Sexo:${person.sexo} </p>
            <p> Cidade:${person.morada.cidade} </p>
    
        `           


    htmlpage+=`
            
            </div>
            <footer class="w3-container w3-blue">
              <h5>Footer</h5>
            </footer>

            </div>
        </body>
    </html>
    `
    return htmlpage
}
