exports.sports = function(dict){
    var htmlpage =`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>SportsPage </title>
        </head>
        <body>

            <div class="w3-card-4">

            <header class="w3-container w3-blue">
              <h1>Distribuição por Desportos </h1>
              <a style="float:right;display: inline-block;" href ="http://localhost:7777/">  Voltar</a>
            </header>

            <div class="w3-container">  
            `
            for (let k in dict){
            htmlpage+=
            `
            <p><a href="http://localhost:7777/sports/${k}"> ${k} </a>${dict[k]}</p>
        `      
            }     


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
