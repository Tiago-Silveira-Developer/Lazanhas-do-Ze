/* ===== ATUALIZAÇÃO DO BADGE DO CARRINHO ===== */

function atualizarBadgeCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const badge = document.getElementById("badgeQtd");
    
    if (badge) {
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        badge.textContent = `(${totalItens})`;
    }
}

// Executa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", atualizarBadgeCarrinho);

// Atualiza o badge quando houver mudanças no localStorage (útil para múltiplas abas)
window.addEventListener("storage", atualizarBadgeCarrinho);