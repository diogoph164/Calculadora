const calculadora = document.getElementById("calculadora");
const botoes = document.querySelectorAll("button");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent;

        if (valor === "C") {
            calculadora.value = "";
        }
        else if (valor === "="){
            try{
                calculadora.value =
                eval(calculadora.value);
            } catch {
                calculadora.value = "Erro"
            }
        }
        else {
            calculadora.value += valor;
        }
    });
});
console.log ( calculadora)