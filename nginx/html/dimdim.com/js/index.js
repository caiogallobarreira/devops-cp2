// fetch from API
const url = "http://localhost:3000/funcionarios";
let table = document.getElementById("funcionariosTable").getElementsByTagName('tbody')[0];
let modal = document.getElementById("editModalContent");
let close = document.getElementById("close");
let addFuncionario = document.getElementById("addFuncionario");
let editFuncionario = document.getElementById("editModalForm");
let listaFuncionarios;

const fetchDados = async () => {
    const response = await fetch(url);
    const json = await response.json();
    listaFuncionarios = json;
    addToTable(json);
}

const addToTable = (json) => {
    table.innerHTML = `
    <tr id="header">
        <th>ID</th>
        <th>Nome</th>
        <th>Endereço</th>
        <th>Email</th>
        <th>CPF</th>
        <th>Ações</th>
    </tr>
    `;

    for (funcionario of json){
        let row = table.insertRow();
        let id = row.insertCell(0);
        let nome = row.insertCell(1);
        let endereco = row.insertCell(2);
        let email = row.insertCell(3);
        let cpf = row.insertCell(4);
        let acoes = row.insertCell(5);

        id.innerHTML = funcionario.funcionario_id;
        nome.innerHTML = funcionario.nome_completo;
        endereco.innerHTML = funcionario.endereco;
        email.innerHTML = funcionario.email;
        cpf.innerHTML = funcionario.cpf;
        acoes.innerHTML = `<button type="button" onClick="triggerModal(${funcionario.funcionario_id})" class="btn btn-primary" data-toggle="modal" data-target="#editModalContent">Editar</button> <button type="button" onClick="triggerDelete(${funcionario.funcionario_id})" class="btn btn-danger">Excluir</button>`;
    }
}

const triggerDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/funcionarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => fetchDados())
}


document.getElementById("addFuncionarioButton").addEventListener("click", async (e) => {
    e.preventDefault();

    let funcionario = {
        nome_completo: e.target.form.nome.value,
        endereco: e.target.form.endereco.value,
        email: e.target.form.email.value,
        cpf: e.target.form.cpf.value
    }

    fetch(`http://localhost:3000/funcionarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(funcionario)
    })
    .then(async response => fetchDados())
})


const triggerModal = (id) => {
    let funcionario = listaFuncionarios.find(funcionario => funcionario.funcionario_id == id);
    // console.log(funcionario)
    
    modal.innerHTML = `
    <span id="close" onClick="closeModal()"><span>&times;</span></span>
    <form id="editModalForm" data-key="${funcionario.funcionario_id}">
        <div>
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Nome" value="${funcionario.nome_completo}">
        </div>
        <div>
            <label for="endereco">Endereço</label>
            <input type="text" id="endereco" name="endereco" placeholder="Endereço" value="${funcionario.endereco}">
        </div>
        <div>
            <label for="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Email" value="${funcionario.email}">
        </div>
        <div>
            <label for="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" placeholder="CPF" value="${funcionario.cpf}">
        </div>
        <div>
        <button type="submit" id="editFuncionarioButton">Editar</button>
        </div>
    </form>
    `;

    document.getElementById("editFuncionarioButton").addEventListener("click", async (e) => {
        e.preventDefault();

        // get ID
        let id = e.target.form.dataset.key;

        let funcionario = {
            nome_completo: e.target.form.nome.value,
            endereco: e.target.form.endereco.value,
            email: e.target.form.email.value,
            cpf: e.target.form.cpf.value
        }

        fetch(`http://localhost:3000/funcionarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        })
        .then(async response => fetchDados())

        closeModal();
    })
    
}

const closeModal = () => {
    document.getElementById("editFuncionarioButton").removeEventListener("click", (e) => {});
    modal.innerHTML = "";
}

fetchDados();