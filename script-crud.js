const form_addTarefa = document.querySelector('.app__form-add-task')
const botao_addTarefa = document.querySelector('.app__button--add-task')
const textArea = document.querySelector('.app__form-textarea')
const ul_tarefas = document.querySelector('.app__section-task-list')
const paragrafo_tarefaAndamento = document.querySelector('.app__section-active-task-description')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefa_selecionada = null
let liTarefa_selecionada = null

const botao_limparTarefas = document.getElementById('btn-remover-todas')
const botao_limparTarefasConcluidas = document.getElementById('btn-remover-concluidas')



function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))//salva no local storage
}

function createElementoTarefa(tarefa) {
    //CRIANDO A LISTA
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    //SVG DO ITEM DA LISTA
    const svg = document.createElement('svg')
    svg.innerHTML = ` 
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    //TEXTO DO ITEM DA LISTA
    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    //BOTÃO DO ITEM DA LISTA  
    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {

        const nova_descricao = prompt("Novo nome da tarefa")
        if (nova_descricao) {
            paragrafo.textContent = nova_descricao//atualiza no DOM
            tarefa.descricao = nova_descricao//Atualiza na lista de tarefas
            atualizarTarefas()//Atualiza no Local storage
        }
    }

    //IMAGEM DO BOTAO DA LISTA
    const img_botao = document.createElement('img')
    img_botao.setAttribute('src', '/imagens/edit.png')
    botao.append(img_botao)

    //JUNTANDO OS ELEMENTOS DENTRO DA LISTA
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if(tarefa.completa){
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    }
    else{
        li.onclick = () => {
        
        //tira a destaque da aba de andamento das tarefas anteriores 
        let li_andamento = document.querySelectorAll('.app__section-task-list-item-active')
        li_andamento.forEach(elememto => {
            elememto.classList.remove('app__section-task-list-item-active')
        })

        //tira a destaque da aba de andamento da propria tarefa 
        if (tarefa_selecionada == tarefa) {
            paragrafo_tarefaAndamento.textContent = ''
            tarefa_selecionada = null
            liTarefa_selecionada = null

            li.classList.remove('.app__section-task-list-item-active')
            return
        }

        //adiciona no aba de andamento se o item for clicado 
        tarefa_selecionada = tarefa
        liTarefa_selecionada = li
        paragrafo_tarefaAndamento.textContent = tarefa.descricao
        li.classList.add('app__section-task-list-item-active')
    }
    }
    

    return li
}
function limpar_fechar_tarefa() {
    textArea.value = ''
    form_addTarefa.classList.toggle('hidden')
}

botao_addTarefa.addEventListener('click', () => {
    form_addTarefa.classList.toggle('hidden')// se tiver a classe tira, se não tiver põe

    const botao_cancelar = document.querySelector('.app__form-footer__button--cancel')
    botao_cancelar.addEventListener('click', limpar_fechar_tarefa)

})

form_addTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();


    const tarefa = { descricao: textArea.value}
    tarefas.push(tarefa)
    const elementoTarefa = createElementoTarefa(tarefa)

    ul_tarefas.append(elementoTarefa)//adiciona no DOM

    atualizarTarefas()

    limpar_fechar_tarefa()
})

tarefas.forEach(tarefa => {
    const elementoTarefa = createElementoTarefa(tarefa)
    ul_tarefas.append(elementoTarefa)

});

document.addEventListener('FocoFinalizado', () => {
    if(tarefa_selecionada &&  liTarefa_selecionada){
        liTarefa_selecionada.classList.remove('app__section-task-list-item-active')
        liTarefa_selecionada.classList.add('app__section-task-list-item-complete')
        liTarefa_selecionada.querySelector('button').setAttribute('disabled', 'disabled')

        tarefa_selecionada.completa = true
        atualizarTarefas()
    }
})

function removerTarefas  (somenteCompletas) {
   
   
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento =>{
        elemento.remove()
    })
   
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
}

botao_limparTarefasConcluidas.onclick = () => removerTarefas(true)
botao_limparTarefas.onclick = () =>  removerTarefas(false)