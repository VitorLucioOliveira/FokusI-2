const form_addTarefa = document.querySelector('.app__form-add-task')
const botao_addTarefa = document.querySelector('.app__button--add-task')
const textArea = document.querySelector('.app__form-textarea')

const ul_tarefas = document.querySelector('.app__section-task-list')
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []


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
    const img_botao = document.createElement('img')
    img_botao.setAttribute('src', '/imagens/edit.png')
    botao.append(img_botao)

    //JUNTANDO OS ELEMENTOS DENTRO DA LISTA
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li
}

botao_addTarefa.addEventListener('click', () => {
    form_addTarefa.classList.toggle('hidden')// se tiver a classe tira, se não tiver põe

})

form_addTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tarefa = { descricao: textArea.value }
    tarefas.push(tarefa)
    const elementoTarefa = createElementoTarefa(tarefa)
    ul_tarefas.append(elementoTarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))

    textArea.value = ''
    form_addTarefa.classList.toggle('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = createElementoTarefa(tarefa)
    ul_tarefas.append(elementoTarefa)

});