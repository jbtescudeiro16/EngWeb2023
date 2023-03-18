var axios = require('axios')

// TarefaLIst
module.exports.list = () => {
    return axios.get('http://localhost:3000/tarefas')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addtask = t => {
    t["done"]="no"
    return axios.post('http://localhost:3000/tarefas',t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.apagatarefa = t => {
    return axios.delete('http://localhost:3000/tarefas/'+t.id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.completeTask = t => {
    return axios.put('http://localhost:3000/tarefas/'+t.id,t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}