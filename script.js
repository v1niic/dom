// Metodos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa"); 
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefas"); 

// Resgate de tarefas do localStorage
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Ouvir e agir sobre o clique 
form.addEventListener("submit", adicionarTarefa);

// Funções
function adicionarTarefa(event) {
    event.preventDefault();
    const texto = inputTarefa.value.trim();
    if (texto === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }
    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };
    tarefas.push(novaTarefa);
    salvarTarefa();
    inputTarefa.value = "";
    inputTarefa.focus();

    console.log(novaTarefa);
}

function renderizarTarefas() {
    tarefas.forEach(function (tarefa, indice){
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = indice + 1;

        const colunaNome = document.createElement("td");
        colunaNome.textContent = tarefa.texto;

        if (tarefa.concluida) {
            colunaNome.classList.add(
                "text-decoration-line-through",
                "text-muted"
            );
        }
    
        const colunaStatus = document.createElement("td");
        if (tarefa.concluida) {
            colunaStatus.innerHTML = '<span class="badge text-bg-success">Concluida</span>';
        } else {
            colunaStatus.innerHTML = '<span class="badge text-bg-warning">Pendente</span>';
        }
    
        linha.appendChild(colunaNumero);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaStatus);

        listaTarefas.appendChild(linha);
    });

}

function salvarTarefa() {
    localStorage.setItem(
        "tarefas", 
        JSON.stringify(tarefas)
    );
}
