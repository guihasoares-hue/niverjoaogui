// ============================================
// TROCA DE ABAS
// ============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

function activateTab(tabId) {
  tabButtons.forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.tab === tabId);
  });
  panels.forEach(panel => {
    panel.classList.toggle('is-active', panel.id === tabId);
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    activateTab(btn.dataset.tab);
    document.getElementById(btn.dataset.tab).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Botão "Confirmar presença" do hero também ativa a aba certa
document.querySelectorAll('[data-tab-target]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    activateTab(el.dataset.tabTarget);
    document.getElementById(el.dataset.tabTarget).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Se o site for aberto com uma #hash (ex: link direto para #presentes)
const initialHash = window.location.hash.replace('#', '');
if (initialHash && document.getElementById(initialHash)?.classList.contains('tab-panel')) {
  activateTab(initialHash);
}

// ============================================
// MENU MOBILE (rolagem até as abas)
// ============================================
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.getElementById('tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ============================================
// ENVIO DO FORMULÁRIO DE CONFIRMAÇÃO (RSVP)
// ============================================
const rsvpForm = document.getElementById('rsvpForm');
const formNote = document.getElementById('formNote');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formNote.textContent = 'Enviando...';

    try {
      const response = await fetch(rsvpForm.action, {
        method: 'POST',
        body: new FormData(rsvpForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formNote.textContent = 'Presença confirmada! Muito obrigado 🦕💚';
        rsvpForm.reset();
      } else {
        formNote.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
      }
    } catch (err) {
      formNote.textContent = 'Não foi possível enviar agora. Verifique sua conexão e tente novamente.';
    }
  });
}
