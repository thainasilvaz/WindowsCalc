/* Selecionando os elementos HTML */
const preview = document.querySelector('#calc-preview');
const visor = document.querySelector('#calc-visor');
const botoes = document.querySelectorAll('#botoes');

document.addEventListener("click", (event) => { //quando houver clique em elementos do html
    const elementoClicado = event.target; //obtendo o elemento clicado

    
    if (isBotao(elementoClicado)) { //se o elemento clicado for um botao
        const valorbtn = elementoClicado.innerText; //obtendo o texto do botão clicado

        if (valorbtn === 'C') { //se for o botão de limpar tudo
            visor.textContent = '';
            preview.textContent = '';
        } else if (valorbtn === 'CE') { //se for o botão de limpar a expressão atual
            visor.textContent = '';
        } else if (valorbtn === '⌫') { //se for o botão de apagar uma unidade
            apagarUltimoCaractere();
        } else if (valorbtn === '=') { //se for o botão de igualdade
            calcularResultado();
        } else {
            const ultimoCaractere = visor.textContent.slice(-1);//pegando o ultimo caractere do visor
            if (!['+', '-', '*', '/'].includes(ultimoCaractere) || !['+', '-', '*', '/'].includes(valorbtn)) { //se o ultimo ou o novo caractere não for uma operacao
                visor.textContent += valorbtn; //adicionando o valor do botão ao visor
            }
        }
    }
});

function isBotao(elemento) {
    return elemento.tagName === 'BUTTON'; //verdadeiro se for uma tag button
}

function calcularResultado() {
    const expressaoAtual = visor.textContent.trim(); //colocando o texto do visor na variavel expressaoAtual (funcao trim tira os espacos do comeco e do final da string)
    if (expressaoAtual) { //se tem algo no visor
        try {
            const resultado = eval(expressaoAtual); //a funcao eval verifica se a expressao é válida e a calcula
            visor.textContent = resultado; //exibindo o resultado no visor
            preview.textContent = expressaoAtual + ' ='; //aparecerá no preview a expressão atual e o = (o resultado estará no visor)
        } catch (error) { //se a expressao for inválida
            visor.textContent = ''; //limpando o visor
            preview.textContent = 'Erro'; //exibindo mensagem de erro
        }
    }
    if (expressaoAtual === "0/0"){
        visor.textContent = "Resultado indefinido"
    }
}

function apagarUltimoCaractere() {
    const numeroAtual = visor.textContent; //pegando o conteudo no visor e colocando na variavel numeroAtual
    visor.textContent = numeroAtual.slice(0, -1); //apagando o ultimo caractere
}