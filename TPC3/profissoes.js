exports.jobs = function(dict){
    var htmlpage =`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>JobsPage </title>
        </head>
        <body>

            <div class="w3-card-4">

            <header class="w3-container w3-blue">
              <h1>Top 10 Profissoes </h1>
              <a style="float:right;display: inline-block;" href ="http://localhost:7777/">  Voltar</a>
            </header>

            <div class="w3-container">  
            `
            var i=0
            for (let k in dict){
                
                if (i<10) {
                    htmlpage+=
                    `
                    <p><a href="http://localhost:7777/jobs/${k}"> ${k} </a>${dict[k]}</p>
                `      
            }     
            i++
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
