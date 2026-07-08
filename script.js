// ===============================
// GAMESTORE - SCRIPT.JS
// ===============================

// Carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Favoritos
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Comprar produto
function comprar(nome, preco = 0) {

    carrinho.push({
        nome,
        preco,
        quantidade: 1
    });

    salvarCarrinho();

    notificar(nome + " foi adicionado ao carrinho!");
}

// Salvar carrinho
function salvarCarrinho() {

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();

}

// Atualizar contador
function atualizarCarrinho(){

    const contador = document.getElementById("contadorCarrinho");

    if(contador){

        contador.innerHTML = carrinho.length;

    }

}

// Mostrar carrinho
function mostrarCarrinho(){

    const lista = document.getElementById("listaCarrinho");

    if(!lista) return;

    lista.innerHTML="";

    let total=0;

    carrinho.forEach((produto,index)=>{

        total += produto.preco;

        lista.innerHTML +=`

        <div class="produtoCarrinho">

            <h3>${produto.nome}</h3>

            <p>R$ ${produto.preco.toFixed(2)}</p>

            <button onclick="removerProduto(${index})">

            Remover

            </button>

        </div>

        `;

    });

    const totalDiv=document.getElementById("totalCarrinho");

    if(totalDiv){

        totalDiv.innerHTML="Total: R$ "+total.toFixed(2);

    }

}

// Remover produto
function removerProduto(index){

    carrinho.splice(index,1);

    salvarCarrinho();

    mostrarCarrinho();

}

// Limpar carrinho
function limparCarrinho(){

    carrinho=[];

    salvarCarrinho();

    mostrarCarrinho();

}

// Favoritar
function favoritar(nome){

    if(!favoritos.includes(nome)){

        favoritos.push(nome);

        localStorage.setItem("favoritos",JSON.stringify(favoritos));

        notificar(nome+" adicionado aos favoritos!");

    }

}

// Pesquisa
function pesquisar(){

    const input=document.getElementById("pesquisa");

    if(!input) return;

    const valor=input.value.toLowerCase();

    const cards=document.querySelectorAll(".card");

    cards.forEach(card=>{

        const texto=card.innerText.toLowerCase();

        if(texto.includes(valor)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}

// Notificação
function notificar(texto){

    const div=document.createElement("div");

    div.className="toast";

    div.innerHTML=texto;

    document.body.appendChild(div);

    setTimeout(()=>{

        div.classList.add("mostrar");

    },100);

    setTimeout(()=>{

        div.remove();

    },3000);

}

// Dark Mode
function alternarTema(){

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "tema",

        document.body.classList.contains("dark")

    );

}

// Carregar tema
window.onload=()=>{

    atualizarCarrinho();

    mostrarCarrinho();

    if(localStorage.getItem("tema")=="true"){

        document.body.classList.add("dark");

    }

};

// Login simples
function login(){

    let email=document.getElementById("email").value;

    let senha=document.getElementById("senha").value;

    if(email==""||senha==""){

        alert("Preencha todos os campos.");

        return;

    }

    localStorage.setItem("usuario",email);

    window.location="index.html";

}

// Cadastro simples
function cadastrar(){

    let nome=document.getElementById("nome").value;

    let email=document.getElementById("email").value;

    let senha=document.getElementById("senha").value;

    const usuario={

        nome,

        email,

        senha

    };

    localStorage.setItem(

        "usuarioCadastro",

        JSON.stringify(usuario)

    );

    alert("Cadastro realizado!");

    window.location="login.html";

}

// Logout
function logout(){

    localStorage.removeItem("usuario");

    window.location="login.html";

}