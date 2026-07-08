let carrinho=0;

function comprar(produto){

carrinho++;

document.getElementById("itens").innerHTML=carrinho;

alert(produto+" adicionado ao carrinho!");

}

const pesquisa=document.getElementById("pesquisa");

pesquisa.addEventListener("keyup",()=>{

let texto=pesquisa.value.toLowerCase();

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let nome=card.innerText.toLowerCase();

card.style.display=nome.includes(texto)?"block":"none";

});

});