class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.hoje = "ter";
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch('aulas.json');
      const aulas = await response.json();
      this.render(aulas);
    } catch (error) {
      console.error('Erro ao carregar os dados das aulas:', error);
    }
  }

  render(aulas) {
    const aulasDia = aulas.filter(a => a.data === this.hoje);

    // Adiciona o link para o CSS ao shadowRoot (vai buscar styles_componente.css na mesma pasta)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles_componente.css';

    // Limpa conteúdo anterior (se houver) e insere o link
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(link);

    // Cria container e preenche com as aulas do dia
    const container = document.createElement('div');

    container.innerHTML = `
      <div>
        ${aulasDia.map(a => {
          // converte nota (string) para número antes da comparação
          const notaNum = Number(a.nota);

          // decide cor baseada no valor da nota
          let notaColor = ''; // se vazio, mantém o CSS padrão
          if (!isNaN(notaNum)) {
            if (notaNum < 6) {
              notaColor = '#e74c3c'; // vermelho
            } else if (notaNum >= 6 && notaNum < 8) {
              notaColor = '#f39c12'; // laranja
            } else { // >= 8
              notaColor = '#27ae60'; // verde
            }
          }

          // aplica estilo inline apenas se definimos uma cor
          const notaStyle = notaColor ? `background-color: ${notaColor};` : '';

          const provaDisplay = a.prova_alert ? '' : 'display: none;';

          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="lable-nota p_lable" style="${notaStyle}">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.shadowRoot.appendChild(container);
  }
}

customElements.define('aulas-component', AulasComponent);
