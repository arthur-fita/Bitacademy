// =============================================
//  BITACADEMY – Sistema de Quiz
//  Lógica central para todos os quizzes
// =============================================

const QUIZZES = {
  matematica: {
    titulo: "Matemática",
    emoji: "🔢",
    cor: "#4F46E5",
    perguntas: [
      {
        pergunta: "Quanto é 7 × 8?",
        opcoes: ["54", "56", "64", "48"],
        correta: 1
      },
      {
        pergunta: "Se João tem 15 figurinhas e dá 7 para um amigo, quantas ele fica?",
        opcoes: ["6", "7", "8", "9"],
        correta: 2
      },
      {
        pergunta: "Qual é o resultado de 144 ÷ 12?",
        opcoes: ["10", "11", "12", "13"],
        correta: 2
      },
      {
        pergunta: "Uma pizza foi dividida em 8 fatias iguais. Ana comeu 3 fatias. Que fração da pizza ela comeu?",
        opcoes: ["1/4", "3/8", "3/5", "1/3"],
        correta: 1
      },
      {
        pergunta: "Qual é o valor de 5² (cinco ao quadrado)?",
        opcoes: ["10", "15", "20", "25"],
        correta: 3
      },
      {
        pergunta: "Numa sala há 30 alunos. 40% deles são meninas. Quantas meninas há?",
        opcoes: ["10", "12", "14", "15"],
        correta: 1
      },
      {
        pergunta: "Qual é a área de um quadrado com lado de 6 cm?",
        opcoes: ["24 cm²", "36 cm²", "12 cm²", "30 cm²"],
        correta: 1
      },
      {
        pergunta: "Qual número é primo?",
        opcoes: ["9", "15", "17", "21"],
        correta: 2
      }
    ]
  },

  portugues: {
    titulo: "Português",
    emoji: "📚",
    cor: "#DC2626",
    perguntas: [
      {
        pergunta: "Qual das palavras abaixo é um substantivo?",
        opcoes: ["Correr", "Bonito", "Casa", "Rapidamente"],
        correta: 2
      },
      {
        pergunta: "Assinale a frase com uso correto da vírgula:",
        opcoes: [
          "João, foi ao mercado, comprar pão.",
          "Maria, que é minha amiga, mora perto.",
          "Ele comeu, e, dormiu logo depois.",
          "O gato, pulou, o muro alto."
        ],
        correta: 1
      },
      {
        pergunta: "Qual é o plural correto de 'cidadão'?",
        opcoes: ["Cidadãos", "Cidadões", "Cidadãons", "Cidadões"],
        correta: 0
      },
      {
        pergunta: "Na frase 'O menino correu rápido', a palavra 'rápido' é:",
        opcoes: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"],
        correta: 3
      },
      {
        pergunta: "Qual figura de linguagem está em: 'Seus olhos são estrelas'?",
        opcoes: ["Metonímia", "Metáfora", "Hipérbole", "Ironia"],
        correta: 1
      },
      {
        pergunta: "Qual palavra está acentuada corretamente?",
        opcoes: ["Voce", "Você", "Vocé", "Você"],
        correta: 3
      },
      {
        pergunta: "Qual é o antônimo de 'alegre'?",
        opcoes: ["Feliz", "Triste", "Animado", "Contente"],
        correta: 1
      },
      {
        pergunta: "Em 'A professora ensinou a turma', o sujeito é:",
        opcoes: ["ensinou", "a turma", "A professora", "professora ensinou"],
        correta: 2
      }
    ]
  },

  ciencias: {
    titulo: "Ciências",
    emoji: "🔬",
    cor: "#059669",
    perguntas: [
      {
        pergunta: "Qual é o processo pelo qual as plantas produzem seu próprio alimento?",
        opcoes: ["Respiração", "Fotossíntese", "Digestão", "Fermentação"],
        correta: 1
      },
      {
        pergunta: "Quantos ossos tem o corpo humano adulto (aproximadamente)?",
        opcoes: ["106", "206", "306", "406"],
        correta: 1
      },
      {
        pergunta: "Qual é o símbolo químico do ouro?",
        opcoes: ["Ou", "Or", "Au", "Ag"],
        correta: 2
      },
      {
        pergunta: "Qual das seguintes é uma lei de Newton?",
        opcoes: [
          "Todo corpo em repouso tende a continuar em repouso",
          "A energia se perde ao mudar de forma",
          "O calor flui do frio para o quente",
          "Todo gás ocupa o mesmo volume"
        ],
        correta: 0
      },
      {
        pergunta: "O DNA se localiza principalmente em qual parte da célula?",
        opcoes: ["Citoplasma", "Membrana", "Núcleo", "Mitocôndria"],
        correta: 2
      },
      {
        pergunta: "Qual é o gás mais abundante na atmosfera terrestre?",
        opcoes: ["Oxigênio", "Dióxido de carbono", "Nitrogênio", "Hidrogênio"],
        correta: 2
      },
      {
        pergunta: "Qual planeta é conhecido como o 'planeta vermelho'?",
        opcoes: ["Júpiter", "Vênus", "Saturno", "Marte"],
        correta: 3
      },
      {
        pergunta: "Qual tipo de rocha é formada pelo resfriamento do magma?",
        opcoes: ["Sedimentar", "Metamórfica", "Ígnea", "Calcária"],
        correta: 2
      }
    ]
  },

  historia: {
    titulo: "História",
    emoji: "🏛️",
    cor: "#D97706",
    perguntas: [
      {
        pergunta: "Em que ano o Brasil proclamou sua Independência?",
        opcoes: ["1800", "1808", "1822", "1888"],
        correta: 2
      },
      {
        pergunta: "Quem foi o líder do movimento de Independência do Brasil?",
        opcoes: ["Dom João VI", "Dom Pedro I", "Tiradentes", "Getúlio Vargas"],
        correta: 1
      },
      {
        pergunta: "A escravidão foi abolida no Brasil com a assinatura de qual lei?",
        opcoes: ["Lei Áurea", "Lei do Ventre Livre", "Lei Saraiva", "Lei Eusébio de Queirós"],
        correta: 0
      },
      {
        pergunta: "Qual civilização construiu as pirâmides do Egito?",
        opcoes: ["Mesopotâmia", "Grécia Antiga", "Egito Antigo", "Império Romano"],
        correta: 2
      },
      {
        pergunta: "A Primeira Guerra Mundial começou em:",
        opcoes: ["1910", "1914", "1918", "1939"],
        correta: 1
      },
      {
        pergunta: "O Renascimento Cultural foi um movimento que surgiu em:",
        opcoes: ["França", "Espanha", "Itália", "Inglaterra"],
        correta: 2
      },
      {
        pergunta: "Quem foram os primeiros europeus a chegar ao Brasil?",
        opcoes: ["Espanhóis", "Franceses", "Holandeses", "Portugueses"],
        correta: 3
      },
      {
        pergunta: "Em que ano ocorreu a proclamação da República no Brasil?",
        opcoes: ["1888", "1889", "1891", "1900"],
        correta: 1
      }
    ]
  },

  geografia: {
    titulo: "Geografia",
    emoji: "🌎",
    cor: "#0284C7",
    perguntas: [
      {
        pergunta: "Qual é o maior bioma do Brasil?",
        opcoes: ["Cerrado", "Caatinga", "Amazônia", "Pantanal"],
        correta: 2
      },
      {
        pergunta: "Qual é o rio mais longo do Brasil?",
        opcoes: ["Rio São Francisco", "Rio Paraná", "Rio Amazonas", "Rio Tocantins"],
        correta: 2
      },
      {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: ["São Paulo", "Rio de Janeiro", "Salvador", "Brasília"],
        correta: 3
      },
      {
        pergunta: "O clima predominante na região Nordeste do Brasil é:",
        opcoes: ["Tropical", "Semiárido", "Equatorial", "Subtropical"],
        correta: 1
      },
      {
        pergunta: "Qual continente tem a maior população do mundo?",
        opcoes: ["África", "Europa", "Américas", "Ásia"],
        correta: 3
      },
      {
        pergunta: "A formação do relevo por dobramentos e falhamentos é causada por:",
        opcoes: ["Erosão da chuva", "Movimentos das placas tectônicas", "Ação dos ventos", "Ciclo da água"],
        correta: 1
      },
      {
        pergunta: "Qual é o oceano que banha a costa brasileira?",
        opcoes: ["Oceano Pacífico", "Oceano Índico", "Oceano Atlântico", "Mar do Caribe"],
        correta: 2
      },
      {
        pergunta: "Quantos estados tem o Brasil?",
        opcoes: ["24", "25", "26", "27"],
        correta: 2
      }
    ]
  },

  filosofia: {
    titulo: "Filosofia",
    emoji: "🤔",
    cor: "#7C3AED",
    perguntas: [
      {
        pergunta: "Quem é considerado o pai da Filosofia ocidental?",
        opcoes: ["Platão", "Aristóteles", "Sócrates", "Tales de Mileto"],
        correta: 2
      },
      {
        pergunta: "'Penso, logo existo' é uma frase de:",
        opcoes: ["Kant", "Descartes", "Hegel", "Nietzsche"],
        correta: 1
      },
      {
        pergunta: "O Mito da Caverna foi criado por qual filósofo?",
        opcoes: ["Sócrates", "Aristóteles", "Platão", "Epicuro"],
        correta: 2
      },
      {
        pergunta: "Qual corrente filosófica defende que o conhecimento vem da experiência?",
        opcoes: ["Racionalismo", "Idealismo", "Empirismo", "Ceticismo"],
        correta: 2
      },
      {
        pergunta: "O Imperativo Categórico é um conceito de:",
        opcoes: ["Rousseau", "Hobbes", "Locke", "Kant"],
        correta: 3
      },
      {
        pergunta: "Qual filósofo defendeu que 'o homem é um animal político'?",
        opcoes: ["Platão", "Aristóteles", "Sócrates", "Epicuro"],
        correta: 1
      },
      {
        pergunta: "A Ética Utilitarista busca maximizar:",
        opcoes: ["A virtude individual", "A felicidade do maior número de pessoas", "O dever moral", "A liberdade absoluta"],
        correta: 1
      },
      {
        pergunta: "Qual filósofo escreveu 'O Contrato Social'?",
        opcoes: ["Hobbes", "Locke", "Rousseau", "Montesquieu"],
        correta: 2
      }
    ]
  },

  artes: {
    titulo: "Artes",
    emoji: "🎨",
    cor: "#DB2777",
    perguntas: [
      {
        pergunta: "Quem pintou a Mona Lisa?",
        opcoes: ["Michelangelo", "Rafael", "Leonardo da Vinci", "Caravaggio"],
        correta: 2
      },
      {
        pergunta: "Qual movimento artístico valorizou a luz natural e as impressões visuais?",
        opcoes: ["Cubismo", "Impressionismo", "Surrealismo", "Expressionismo"],
        correta: 1
      },
      {
        pergunta: "A Semana de Arte Moderna no Brasil ocorreu em:",
        opcoes: ["1910", "1922", "1930", "1945"],
        correta: 1
      },
      {
        pergunta: "Quais são as cores primárias na pintura (subtrativa)?",
        opcoes: [
          "Vermelho, Verde e Azul",
          "Amarelo, Azul e Vermelho",
          "Cyan, Magenta e Amarelo",
          "Laranja, Roxo e Verde"
        ],
        correta: 1
      },
      {
        pergunta: "Michelangelo pintou o teto de qual famosa construção?",
        opcoes: ["Catedral de Notre-Dame", "Basílica de São Pedro", "Capela Sistina", "Panteão de Roma"],
        correta: 2
      },
      {
        pergunta: "Qual técnica artística usa cera ou tinta para criar relevos em superfícies?",
        opcoes: ["Aquarela", "Gravura", "Encáustica", "Fresco"],
        correta: 2
      },
      {
        pergunta: "O estilo Barroco é conhecido pela:",
        opcoes: ["Simplicidade e leveza", "Dramaticidade e movimento", "Abstração geométrica", "Cores suaves e planas"],
        correta: 1
      },
      {
        pergunta: "Na teoria das cores, quais são as cores complementares do vermelho?",
        opcoes: ["Azul", "Verde", "Amarelo", "Roxo"],
        correta: 1
      }
    ]
  },

  ingles: {
    titulo: "Inglês",
    emoji: "🇺🇸",
    cor: "#0369A1",
    perguntas: [
      {
        pergunta: "What is the correct translation of 'Biblioteca'?",
        opcoes: ["Bookstore", "Library", "Book", "School"],
        correta: 1
      },
      {
        pergunta: "Choose the correct sentence in Simple Past:",
        opcoes: ["She go to school yesterday.", "She goes to school yesterday.", "She went to school yesterday.", "She gone to school yesterday."],
        correta: 2
      },
      {
        pergunta: "What does 'eventually' mean in Portuguese?",
        opcoes: ["Eventualmente", "Finalmente", "Rapidamente", "Certamente"],
        correta: 1
      },
      {
        pergunta: "Which is the correct plural of 'child'?",
        opcoes: ["Childs", "Childes", "Children", "Childrens"],
        correta: 2
      },
      {
        pergunta: "Translate: 'Eu moro no Brasil há 5 anos.'",
        opcoes: [
          "I lived in Brazil for 5 years.",
          "I have lived in Brazil for 5 years.",
          "I am living in Brazil since 5 years.",
          "I was living in Brazil for 5 years."
        ],
        correta: 1
      },
      {
        pergunta: "What is the opposite of 'ancient'?",
        opcoes: ["Old", "Antique", "Modern", "Classic"],
        correta: 2
      },
      {
        pergunta: "Choose the correct question tag: 'You are a student, ___?'",
        opcoes: ["are you?", "isn't it?", "aren't you?", "don't you?"],
        correta: 2
      },
      {
        pergunta: "Which word is a FALSE COGNATE (falso cognato)?",
        opcoes: ["Hospital", "Animal", "Actual", "Natural"],
        correta: 2
      }
    ]
  }
};

// =============================================
//  LÓGICA DO QUIZ
// =============================================

class QuizEngine {
  constructor(materia) {
    this.materia = materia;
    this.dados = QUIZZES[materia];
    this.perguntas = this._embaralhar([...this.dados.perguntas]).slice(0, 5);
    this.atual = 0;
    this.pontuacao = 0;
    this.respostas = [];
    this.respondeu = false;
  }

  _embaralhar(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  get perguntaAtual() {
    return this.perguntas[this.atual];
  }

  get totalPerguntas() {
    return this.perguntas.length;
  }

  get progresso() {
    return ((this.atual) / this.totalPerguntas) * 100;
  }

  responder(indice) {
    if (this.respondeu) return null;
    this.respondeu = true;
    const correto = indice === this.perguntaAtual.correta;
    if (correto) this.pontuacao++;
    this.respostas.push({ correto, escolhida: indice, correta: this.perguntaAtual.correta });
    return correto;
  }

  proximo() {
    if (this.atual < this.totalPerguntas - 1) {
      this.atual++;
      this.respondeu = false;
      return true;
    }
    return false; // fim do quiz
  }

  get finalizado() {
    return this.atual >= this.totalPerguntas - 1 && this.respondeu;
  }

  get mensagemFinal() {
    const pct = (this.pontuacao / this.totalPerguntas) * 100;
    if (pct === 100) return { emoji: "🏆", texto: "Perfeito! Nota 10!", classe: "perfeito" };
    if (pct >= 80) return { emoji: "⭐", texto: "Muito bem! Quase perfeito!", classe: "otimo" };
    if (pct >= 60) return { emoji: "👍", texto: "Bom resultado! Continue praticando.", classe: "bom" };
    if (pct >= 40) return { emoji: "📖", texto: "Precisa estudar mais um pouco!", classe: "regular" };
    return { emoji: "💪", texto: "Não desista! Tente novamente.", classe: "fraco" };
  }
}

// =============================================
//  RENDERIZADOR DO QUIZ (injeta na página)
// =============================================

class QuizUI {
  constructor(containerId, materia) {
    this.container = document.getElementById(containerId);
    this.engine = new QuizEngine(materia);
    this.render();
  }

  render() {
    this.container.innerHTML = "";
    this.container.className = "quiz-container";

    // Header do quiz
    const header = document.createElement("div");
    header.className = "quiz-header";
    header.innerHTML = `
      <div class="quiz-titulo">
        <span class="quiz-emoji">${this.engine.dados.emoji}</span>
        Quiz de ${this.engine.dados.titulo}
      </div>
      <div class="quiz-progresso-texto">
        Pergunta <span id="q-atual">${this.engine.atual + 1}</span> de ${this.engine.totalPerguntas}
      </div>
    `;
    this.container.appendChild(header);

    // Barra de progresso
    const barraContainer = document.createElement("div");
    barraContainer.className = "quiz-barra-container";
    barraContainer.innerHTML = `
      <div class="quiz-barra" id="quiz-barra" style="width: ${this.engine.progresso}%"></div>
    `;
    this.container.appendChild(barraContainer);

    // Corpo da pergunta
    this.corpo = document.createElement("div");
    this.corpo.className = "quiz-corpo";
    this.container.appendChild(this.corpo);

    this.renderPergunta();
  }

  renderPergunta() {
    const p = this.engine.perguntaAtual;
    this.corpo.innerHTML = `
      <div class="quiz-pergunta" id="quiz-pergunta">${p.pergunta}</div>
      <div class="quiz-opcoes" id="quiz-opcoes">
        ${p.opcoes.map((op, i) => `
          <button class="quiz-opcao" data-indice="${i}" onclick="window._quizUI.selecionar(${i})">
            <span class="quiz-letra">${String.fromCharCode(65 + i)}</span>
            <span class="quiz-texto-opcao">${op}</span>
          </button>
        `).join("")}
      </div>
      <div class="quiz-feedback" id="quiz-feedback" style="display:none"></div>
      <div class="quiz-botoes" id="quiz-botoes" style="display:none">
        <button class="quiz-btn-proximo" onclick="window._quizUI.proximo()">
          ${this.engine.atual < this.engine.totalPerguntas - 1 ? "Próxima →" : "Ver Resultado 🎯"}
        </button>
      </div>
    `;
  }

  selecionar(indice) {
    const correto = this.engine.responder(indice);
    if (correto === null) return;

    const opcoes = document.querySelectorAll(".quiz-opcao");
    opcoes.forEach((btn, i) => {
      btn.disabled = true;
      if (i === this.engine.perguntaAtual.correta) {
        btn.classList.add("correta");
      } else if (i === indice && !correto) {
        btn.classList.add("errada");
      }
    });

    const feedback = document.getElementById("quiz-feedback");
    feedback.style.display = "block";
    feedback.className = `quiz-feedback ${correto ? "feedback-correto" : "feedback-errado"}`;
    feedback.innerHTML = correto
      ? "✅ Correto! Muito bem!"
      : `❌ Errado! A resposta certa era: <strong>${this.engine.perguntaAtual.opcoes[this.engine.perguntaAtual.correta]}</strong>`;

    document.getElementById("quiz-botoes").style.display = "flex";

    // Atualiza barra de progresso
    const novoPct = ((this.engine.atual + 1) / this.engine.totalPerguntas) * 100;
    document.getElementById("quiz-barra").style.width = novoPct + "%";
  }

  proximo() {
    const temProximo = this.engine.proximo();
    if (!temProximo) {
      this.renderResultado();
      return;
    }
    document.getElementById("q-atual").textContent = this.engine.atual + 1;
    this.renderPergunta();
    document.getElementById("quiz-barra").style.width = this.engine.progresso + "%";
  }

  renderResultado() {
    const msg = this.engine.mensagemFinal;
    this.corpo.innerHTML = `
      <div class="quiz-resultado ${msg.classe}">
        <div class="resultado-emoji">${msg.emoji}</div>
        <div class="resultado-pontuacao">${this.engine.pontuacao} / ${this.engine.totalPerguntas}</div>
        <div class="resultado-mensagem">${msg.texto}</div>
        <button class="quiz-btn-reiniciar" onclick="window._quizUI.reiniciar()">🔄 Jogar Novamente</button>
        <a href="../Bitacademy.html" class="quiz-btn-home">🏠 Página Inicial</a>
      </div>
    `;
  }

  reiniciar() {
    this.engine = new QuizEngine(this.engine.materia);
    this.render();
  }
}

// =============================================
//  INICIALIZAÇÃO AUTOMÁTICA
// =============================================

function iniciarQuiz(containerId, materia) {
  window._quizUI = new QuizUI(containerId, materia);
}
