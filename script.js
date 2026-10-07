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
    renderizarTarefas();
    inputTarefa.value = "";
    inputTarefa.focus();

    console.log(novaTarefa);
}

function renderizarTarefas() {
    listaTarefas.innerHTML = "";
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

        const colunaAcoes = document.createElement("td");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent =
            tarefa.concluida
            ? "Reabrir"
            : "Concluir";
        botaoConcluir.classList.add(
            "btn",
            tarefa.concluida ? "btn-warning" : "btn-primary",
            "btn-sm",
            "me-2"
        );

        botaoConcluir.addEventListener(
            "click", 
            function () {
            alterarStatus(tarefa.id);
        });

        const botaoEditar = document.createElement("button");
        const botaoExcluir = document.createElement("button");

        colunaAcoes.appendChild(botaoConcluir);
    
        linha.appendChild(colunaNumero);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaAcoes);

        listaTarefas.appendChild(linha);
    });

}

function salvarTarefa() {
    localStorage.setItem(
        "tarefas", 
        JSON.stringify(tarefas)
    );
}

function alterarStatus(id) {
    tarefas.forEach(function (tarefa) {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }
    });
    salvarTarefa();
    renderizarTarefas();
}
renderizarTarefas();
