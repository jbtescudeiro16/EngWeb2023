exports.peoplePages = function(list){
    var htmlpage =`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>About People</title>
        </head>
        <body>

            <div class="w3-card-4">

            <header class="w3-container w3-blue">
              <h1>Pessoas  ${list.length}</h1>
              <a style="float:right;display: inline-block;" href ="http://localhost:7777/">  Voltar</a>
            </header>

            <div class="w3-container">            
            <table class="w3-table-all">
                <tr>
                     <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th><th>Additional Info</th>
                </tr>
    
        `           

  

    for (let i=0; i<list.length; i++){
        htmlpage+=`
                    <tr>
                        <td>${list[i].id}</td><td>${list[i].nome}</td><td>${list[i].idade}</td><td>${list[i].sexo}</td><td>${list[i].morada.cidade}</td><td ><a href="http://localhost:7777/people/${list[i].id}">  Mais Informações </a> </td>
                    </tr>
        `
    }

    htmlpage+=`
            </table>
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
