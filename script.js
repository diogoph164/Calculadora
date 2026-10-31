
// =======================================
// 1. CAPTURANDO OS ELEMENTOS DO HTML
// =======================================

// getElementById procura um elemento pelo seu ID.

const campoSalario = document.getElementById("salario");

const campoDescricao = document.getElementById("descricao");

const campoObservacao = document.getElementById("observacao");

const campoCategoria = document.getElementById("categoria");

const campoValor = document.getElementById("valor");


// Capturando os botões
const botaoSalario = document.getElementById("definir-salario");

const botaoAdicionar = document.getElementById("adicionar-gasto");


// Capturando os elementos que mostram os valores
const salarioExibido = document.getElementById("salario-exibido");

const gastosExibido = document.getElementById("gastos-exibido");

const saldoExibido = document.getElementById("saldo-exibido");


// Capturando o corpo da tabela
const listaGastos = document.querySelector("tbody");


// =======================================
// 2. VARIÁVEIS DO SISTEMA
// =======================================

// Salário inicial
let salario = 0;


// Array que armazenará os gastos.
// Cada gasto será um objeto com nome, observação,
// categoria e valor.
let gastos = [];


// =======================================
// 3. FORMATANDO O DINHEIRO
// =======================================

function formatarMoeda(valor) {

    // Transforma o número em formato monetário brasileiro.
    return valor.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


// =======================================
// 4. DEFININDO O SALÁRIO
// =======================================

// addEventListener aguarda um evento.
// Neste caso, o evento é o clique no botão.

botaoSalario.addEventListener("click", function() {

    // Captura o valor digitado e transforma em número.
    const valorSalario = Number(campoSalario.value);


    // Verifica se o campo está vazio ou se o valor é inválido.
    if (
        campoSalario.value.trim() === "" ||
        !Number.isFinite(valorSalario) ||
        valorSalario < 0
    ) {

        alert("Informe um salário válido!");

        // return encerra a função.
        return;

    }


    // Atualiza a variável principal.
    salario = valorSalario;


    // Atualiza os valores apresentados na tela.
    atualizarResumo();


    // Salva os dados no navegador.
    salvarDados();


    alert("Salário definido com sucesso!");

});


// =======================================
// 5. ADICIONANDO UM GASTO
// =======================================

botaoAdicionar.addEventListener("click", function() {

    // Captura o nome do gasto.
    // trim remove espaços no começo e no final.
    const descricao = campoDescricao.value.trim();


    // Captura a descrição detalhada.
    const observacao = campoObservacao.value.trim();


    // Captura a categoria.
    const categoria = campoCategoria.value;


    // Captura o valor e transforma em número.
    const valor = Number(campoValor.value);


    // Verifica se os campos obrigatórios foram preenchidos.
    // A observação é opcional.
    if (
        descricao === "" ||
        categoria === "" ||
        campoValor.value.trim() === "" ||
        !Number.isFinite(valor) ||
        valor <= 0
    ) {

        alert("Preencha os campos obrigatórios corretamente!");

        return;

    }


    // Cria um objeto com as informações do gasto.
    const novoGasto = {

        descricao: descricao,

        observacao: observacao,

        categoria: categoria,

        valor: valor

    };


    // push adiciona o objeto ao final do array.
    gastos.push(novoGasto);


    // Atualiza a tabela.
    atualizarTabela();


    // Atualiza os cálculos financeiros.
    atualizarResumo();


    // Salva as alterações.
    salvarDados();


    // Limpa os campos depois do cadastro.
    campoDescricao.value = "";

    campoObservacao.value = "";

    campoCategoria.value = "";

    campoValor.value = "";


    // Deixa o cursor no campo de nome.
    campoDescricao.focus();

});


// =======================================
// 6. CALCULANDO O RESUMO FINANCEIRO
// =======================================

function atualizarResumo() {

    // reduce percorre o array e soma os valores.
    const totalGastos = gastos.reduce(function(soma, gasto) {

        // Soma o valor atual com o próximo gasto.
        return soma + gasto.valor;

    }, 0);


    // Calcula o dinheiro que sobrou.
    const saldo = salario - totalGastos;


    // Atualiza os valores no HTML.
    salarioExibido.textContent = formatarMoeda(salario);

    gastosExibido.textContent = formatarMoeda(totalGastos);

    saldoExibido.textContent = formatarMoeda(saldo);

}


// =======================================
// 7. MOSTRANDO OS GASTOS NA TABELA
// =======================================

function atualizarTabela() {

    // Limpa a tabela antes de reconstruí-la.
    listaGastos.innerHTML = "";


    // Verifica se a lista está vazia.
    if (gastos.length === 0) {

        // Cria uma linha.
        const linha = document.createElement("tr");


        // Cria uma célula.
        const coluna = document.createElement("td");


        // A tabela possui cinco colunas.
        coluna.colSpan = 5;


        coluna.className = "lista-vazia";

        coluna.textContent = "Nenhum gasto cadastrado.";


        // Coloca a célula dentro da linha.
        linha.appendChild(coluna);


        // Coloca a linha dentro da tabela.
        listaGastos.appendChild(linha);


        return;

    }


    // forEach percorre todos os gastos cadastrados.
    // gasto representa o objeto atual.
    // indice representa a posição dele no array.
    gastos.forEach(function(gasto, indice) {


        // Cria uma linha para o gasto.
        const linha = document.createElement("tr");


        // COLUNA 1: NOME DO GASTO
        const colunaDescricao = document.createElement("td");

        colunaDescricao.textContent = gasto.descricao;


        // COLUNA 2: OBSERVAÇÃO
        const colunaObservacao = document.createElement("td");

        // Mostra a observação ou um traço quando estiver vazia.
        colunaObservacao.textContent = gasto.observacao || "—";


        // COLUNA 3: CATEGORIA
        const colunaCategoria = document.createElement("td");

        colunaCategoria.textContent = gasto.categoria;


        // COLUNA 4: VALOR
        const colunaValor = document.createElement("td");

        colunaValor.textContent = formatarMoeda(gasto.valor);


        // COLUNA 5: AÇÃO
        const colunaAcao = document.createElement("td");


        // Cria o botão de excluir.
        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";

        botaoExcluir.className = "botao-excluir";


        // Evento de clique para excluir o gasto.
        botaoExcluir.addEventListener("click", function() {

            // splice remove o gasto pelo índice.
            gastos.splice(indice, 1);


            // Atualiza a tabela e os cálculos.
            atualizarTabela();

            atualizarResumo();


            // Salva a alteração.
            salvarDados();

        });


        // Organiza os elementos dentro da linha.
        colunaAcao.appendChild(botaoExcluir);

        linha.appendChild(colunaDescricao);

        linha.appendChild(colunaObservacao);

        linha.appendChild(colunaCategoria);

        linha.appendChild(colunaValor);

        linha.appendChild(colunaAcao);


        // Adiciona a linha completa à tabela.
        listaGastos.appendChild(linha);

    });

}


// =======================================
// 8. SALVANDO OS DADOS
// =======================================

function salvarDados() {

    // Cria um objeto com o salário e a lista de gastos.
    const dados = {

        salario: salario,

        gastos: gastos

    };


    // JSON.stringify transforma o objeto em texto.
    // localStorage guarda esse texto no navegador.
    localStorage.setItem("calculoGastos", JSON.stringify(dados));

}


// =======================================
// 9. CARREGANDO OS DADOS SALVOS
// =======================================

function carregarDados() {

    try {

        // Busca os dados armazenados no navegador.
        const dadosSalvos = localStorage.getItem("calculoGastos");


        // Se não existir nenhum dado, encerra a função.
        if (!dadosSalvos) {

            return;

        }


        // JSON.parse transforma o texto novamente em objeto.
        const dados = JSON.parse(dadosSalvos);


        // Recupera o salário.
        if (Number.isFinite(Number(dados.salario))) {

            salario = Number(dados.salario);

        }


        // Verifica se gastos é realmente uma lista.
        if (Array.isArray(dados.gastos)) {

            // Filtra os gastos que possuem informações válidas.
            gastos = dados.gastos.filter(function(gasto) {

                return (
                    gasto &&
                    typeof gasto.descricao === "string" &&
                    typeof gasto.categoria === "string" &&
                    Number.isFinite(Number(gasto.valor)) &&
                    Number(gasto.valor) > 0
                );

            }).map(function(gasto) {

                // Reconstrói cada objeto.
                // Também permite carregar gastos antigos sem observação.
                return {

                    descricao: gasto.descricao,

                    observacao:
                        typeof gasto.observacao === "string"
                            ? gasto.observacao
                            : "",

                    categoria: gasto.categoria,

                    valor: Number(gasto.valor)

                };

            });

        }


        // Mostra o salário salvo no campo.
        campoSalario.value = salario;


    } catch (erro) {

        // Mostra o erro no console do navegador.
        console.error("Erro ao carregar os dados:", erro);

        salario = 0;

        gastos = [];

    }

}


// =======================================
// 10. INICIALIZANDO O SISTEMA
// =======================================

// Primeiro recupera as informações salvas.
carregarDados();


// Depois atualiza a tabela.
atualizarTabela();


// Por último atualiza os valores financeiros.
atualizarResumo();
