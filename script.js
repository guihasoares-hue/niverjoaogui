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
// CAMPOS DE NOME EXTRAS (ADULTOS E CRIANÇAS)
// ============================================
const inputAdultos = document.getElementById('inputAdultos');
const inputCriancas = document.getElementById('inputCriancas');
const nomesExtrasContainer = document.getElementById('nomesExtrasContainer');

function renderNomesExtras() {
  if (!inputAdultos || !inputCriancas || !nomesExtrasContainer) return;

  // guarda os valores já digitados antes de redesenhar os campos
  const valoresSalvos = {};
  nomesExtrasContainer.querySelectorAll('input').forEach(input => {
    valoresSalvos[input.name] = input.value;
  });

  const totalAdultos = parseInt(inputAdultos.value, 10) || 0;
  const totalCriancas = parseInt(inputCriancas.value, 10) || 0;

  let html = '';

  if (totalAdultos > 1) {
    html += '<p class="nomes-extras-title">Nome dos outros adultos</p>';
    for (let i = 2; i <= totalAdultos; i++) {
      const nomeCampo = `adulto_nome_${i}`;
      const valor = valoresSalvos[nomeCampo] || '';
      html += `
        <label>
          Adulto ${i}
          <input type="text" name="${nomeCampo}" placeholder="Nome do adulto ${i}" value="${valor}">
        </label>`;
    }
  }

  if (totalCriancas > 0) {
    html += '<p class="nomes-extras-title">Nome das crianças</p>';
    for (let i = 1; i <= totalCriancas; i++) {
      const nomeCampo = `crianca_nome_${i}`;
      const valor = valoresSalvos[nomeCampo] || '';
      html += `
        <label>
          Criança ${i}
          <input type="text" name="${nomeCampo}" placeholder="Nome da criança ${i}" value="${valor}">
        </label>`;
    }
  }

  nomesExtrasContainer.innerHTML = html;
}

if (inputAdultos && inputCriancas) {
  inputAdultos.addEventListener('input', renderNomesExtras);
  inputCriancas.addEventListener('input', renderNomesExtras);
  renderNomesExtras();
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
