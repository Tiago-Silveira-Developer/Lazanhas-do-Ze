/* ===== SISTEMA DE CARRINHO ===== */

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarItem(nome, preco) {
    const item = carrinho.find(i => i.nome === nome);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    salvarCarrinho();
    criarAlertaBootstrap(`${nome} adicionada ao carrinho!`);
    atualizarCarrinhoLateral();
}

/* ===== FUNÇÕES DOS SABORES ===== */

function addItemCarBolonha() { adicionarItem("Lasanha Bolonhesa", 49.90); }
function addItemCarQueijo() { adicionarItem("Lasanha 4 Queijos", 49.90); }
function addItemCarCarne() { adicionarItem("Lasanha Carne com Bacon", 49.90); }
function addItemCarCamarao() { adicionarItem("Lasanha de Camarão", 49.90); }

/* ===== CARRINHO LATERAL ===== */

function abrirCarrinho() {
    const aside = document.getElementById("cartTool");
    aside.classList.toggle("carToolShow");
    atualizarCarrinhoLateral();
}

function atualizarCarrinhoLateral() {
    const container = document.getElementById("cart");
    const itemsHTML = carrinho.map(item => `
        <div class="itemCart">
            ${item.nome} x${item.quantidade} – R$ ${(item.preco * item.quantidade).toFixed(2)}
        </div>
    `).join("");

    container.querySelector("#cartItems").innerHTML = itemsHTML;

    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
    document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
}

/* ===== ENVIO PARA WHATSAPP ===== */

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("confirm").addEventListener("click", () => {
        if (carrinho.length === 0) {
            criarAlertaBootstrap("Seu carrinho está vazio!", "danger");
            return;
        }

        const mensagem = carrinho
            .map(item => `• ${item.nome} x${item.quantidade} – R$ ${(item.preco * item.quantidade).toFixed(2)}`)
            .join("%0A");

        const total = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);

        const link = `https://wa.me/5551998123763?text=Olá,%20quero%20fazer%20um%20pedido:%0A${mensagem}%0A%0ATotal:%20R$%20${total.toFixed(2)}`;
        window.open(link, "_blank");
    });

    atualizarCarrinhoLateral();
});

/* ===== ALERTA BOOTSTRAP ===== */

function criarAlertaBootstrap(texto, tipo = "success") {
    const alert = document.createElement("div");
    alert.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
    alert.style.zIndex = 20000;
    alert.textContent = texto;

    document.body.appendChild(alert);

    setTimeout(() => alert.remove(), 3000);
}
