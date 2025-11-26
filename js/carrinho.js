/* ===== GERENCIAMENTO DA PÁGINA DO CARRINHO ===== */

let carrinho = [];

function carregarCarrinho() {
    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    console.log("Carrinho carregado:", carrinho); // Debug
}

function renderizarCarrinho() {
    const container = document.getElementById("carrinho-container");
    
    if (!container) return;
    
    // Recarregar carrinho do localStorage antes de renderizar
    carregarCarrinho();
    
    container.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="text-center p-4">
                <p class="text-muted">Seu carrinho está vazio</p>
                <a href="cardapio.html" class="btn btn-primary mt-3">Ver Cardápio</a>
            </div>
        `;
        const totalElement = document.getElementById("total");
        if (totalElement) totalElement.textContent = "0.00";
        return;
    }

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        container.innerHTML += `
            <div class="d-flex justify-content-between align-items-center bg-white p-3 rounded mb-2 shadow-sm">
                <div>
                    <strong>${item.nome}</strong><br>
                    R$ ${item.preco.toFixed(2)} x ${item.quantidade} =
                    <strong>R$ ${subtotal.toFixed(2)}</strong>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removerItem(${index})">Remover</button>
            </div>
        `;
    });

    const totalElement = document.getElementById("total");
    if (totalElement) totalElement.textContent = total.toFixed(2);
}

function removerItem(index) {
    carregarCarrinho(); // Recarregar antes de remover
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
    
    // Atualizar badge se a função existir
    if (typeof atualizarBadgeCarrinho === 'function') {
        atualizarBadgeCarrinho();
    }
}

function limparCarrinho() {
    if (!confirm("Deseja esvaziar o carrinho?")) return;
    
    localStorage.removeItem("carrinho");
    carrinho = [];
    renderizarCarrinho();
    
    // Atualizar badge se a função existir
    if (typeof atualizarBadgeCarrinho === 'function') {
        atualizarBadgeCarrinho();
    }
}

function enviarPedido() {
    carregarCarrinho(); // Recarregar antes de enviar
    
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    const msg = carrinho
        .map(i => `• ${i.nome} x${i.quantidade} – R$ ${(i.preco * i.quantidade).toFixed(2)}`)
        .join("%0A");

    const total = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);

    window.open(
        `https://wa.me/5551998123763?text=Pedido:%0A${msg}%0ATotal:%20R$%20${total.toFixed(2)}`,
        "_blank"
    );
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();

    const btnLimpar = document.getElementById("limparCarrinho");
    const btnEnviar = document.getElementById("enviarPedido");

    if (btnLimpar) {
        btnLimpar.addEventListener("click", limparCarrinho);
    }

    if (btnEnviar) {
        btnEnviar.addEventListener("click", enviarPedido);
    }
});