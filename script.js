// let banco = [
//   {listItem: 'PHP', status: ''},
//   {listItem: 'Java', status: 'checked'},
//   {listItem: 'C#', status: 'checked'},
//   {listItem: 'JavaScript', status: ''},
//   {listItem: 'NodeJS', status: ''},
// ]

const newItem = document.getElementById('newItem').addEventListener('keypress', inserirItem)
const todoListClick = document.getElementById('todoList').addEventListener('click', clickItem)

function criarItem(tarefas, status, indice){
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefas}</div>
        <input type="button" value="X" data-indice = ${indice}>
    `
    const docs = document.getElementById('todoList')
    docs.appendChild(item)
}

function notReplicItem(){
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

function atualizarTela(){
    notReplicItem()
    const banco = getBanco()
    banco.forEach((item, indice) => criarItem(item.listItem, item.status, indice))
}
atualizarTela()

function inserirItem(evento){
    const teclaEnter = evento.key
    const signinInput = evento.target.value
    if(teclaEnter === 'Enter'){
        const banco = getBanco()
        banco.push({listItem: signinInput, status: ''})
        setBanco(banco)
        atualizarTela()
        evento.target.value = ''
    }
}

function removerItem(indice){
    const banco = getBanco()
    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela()
}

function atualizarItem(indice){
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}

function clickItem(evento){
    const elemento = evento.target
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice
        removerItem(indice)
    }else if(elemento.type === 'checkbox'){
        const { indice } = elemento.dataset
        atualizarItem(indice)
    }
}

function setBanco(banco){
    localStorage.setItem('todoList', JSON.stringify(banco))
}

function getBanco(){
    return JSON.parse(localStorage.getItem('todoList')) ?? []
}