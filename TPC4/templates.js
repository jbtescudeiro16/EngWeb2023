exports.tarefaspage = function(slist, d){
    
    var todo=[]
    var done=[]

  
    for(let i=0;i<slist.length;i++){
        if (slist[i].done=="yes") done.push(slist[i])
        else todo.push(slist[i])
    }
            
               

           


    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
            <title>Student Management</title>
        </head>
        <body>

    
        
        
    <form class="w3-container w3-card-4 w3-light-grey w3-text-orange w3-margin" id="addTask" method="POST">
        <fieldset>
            <div class="w3-row w3-section">
            <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
                <div class="w3-rest">
                <label>nome_parceiro</label>
                <input class="w3-input w3-border" name="nome_parceiro" type="text" placeholder="Name">
                </div>
            </div>

            <div class="w3-row w3-section">
            <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
                <div class="w3-rest">
                <label>descrição</label>
                <input class="w3-input w3-border" name="descrição" type="text" placeholder="Task Description">
                </div>
            </div>

            <div class="w3-row w3-section">
            <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-calendar-alt"></i></div>
                <div class="w3-rest">
                    <label>due_date</label>
                    <input class="w3-input w3-border" name="due_date" type="date" placeholder="Due Date">
                </div>  
            </div>
        </fieldset>

        <button class="w3-button w3-block w3-section w3-grey w3-ripple w3-padding" type="Submit">Register</button>
    </form>
   
   
   
   
   
   
        <br>

    <div>
    <div class="w3-half">

        <header class="w3-container w3-red w3-center">
            <h1>TODO Tasks</h1>
        </header>
    `

    for(let i=0; i < todo.length ; i++){
        pagHTML += `
        <div class = "w3-container">
        <div class="w3-panel w3-pale-red w3-bottombar w3-border-red w3-border">      
            <p>Person : ${todo[i].nome_parceiro}</p>
            <p>DueDatee :${todo[i].due_date}</p>
            <p>Description : ${todo[i].descrição}</p>   
            <div class="w3-right-align">  
                <button class="w3-button w3-grey w3-hover-red w3-card-4" type="submit" form="delete${todo[i].id}">Delete</button>
                <button class="w3-button w3-green w3-hover-green w3-card-4" type="submit" form="complete${todo[i].id}">Complete</button>
                <form id="delete${todo[i].id}" method="POST" action="delete">
                    <input type="hidden" name="id" value="${todo[i].id}">
                </form>
                <form id="complete${todo[i].id}" method="POST" action="complete">
                    <input type="hidden" name="id" value="${todo[i].id}">
                    <input type="hidden" name="nome_parceiro" value="${todo[i].nome_parceiro}">
                    <input type="hidden" name="due_date" value="${todo[i].due_date}">
                    <input type="hidden" name="descrição" value="${todo[i].descrição}">
                    <input type="hidden" name="done" value="yes">
            </form>


            </div>
        </div>
        </div>
        `
    }
    pagHTML+=`
    </div>
    <div>
    <div class="w3-half">

        <header class="w3-container w3-teal w3-center">
            <h1>DONE Tasks</h1>
        </header>

    
    `
        for(let i=0; i < done.length ; i++){
        pagHTML += `
            <div class = "w3-container">
            <div class="w3-panel w3-pale-green w3-bottombar w3-border-green w3-border">
            
                <p>Person : ${done[i].nome_parceiro}</p>
                <p>DueDatee :${done[i].due_date}</p>
                <p>Description : ${done[i].descrição}</p>     

                <div class="w3-right-align">  
                <button class="w3-button w3-grey w3-hover-red w3-card-4" type="submit" form="delete${done[i].id}">Delete</button>
                
                <form id="delete${done[i].id}" method="POST" action="delete">
                    <input type="hidden" name="id" value="${done[i].id}">
                </form>
            </div>
                
               
            </div>
            </div>
                `
}




    

    pagHTML += `  
            </div>     
            </div>
        </body>
    </html>
    `
    return pagHTML
}

