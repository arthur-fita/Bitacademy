window.BitAcademyAuth = (() => {
  const USERS_KEY = "bitacademy.users";
  const SESSION_KEY = "bitacademy.session";
  const QUIZ_SCORES_KEY = "bitacademy.quizScores";
  const GAME_SCORES_KEY = "bitacademy.gameScores";

  const readJson = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  };

  const saveJson = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const normalize = (value) => value.trim().toLowerCase();
  const getRelativePrefix = () => {
    const path = window.location.pathname;
    return path.includes("/Quiz/") || path.includes("/Jogos/") ? "../" : "";
  };

  const createId = () => {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const getUsers = () => readJson(USERS_KEY, []);
  const saveUsers = (users) => saveJson(USERS_KEY, users);

  const getCurrentUser = () => {
    const session = readJson(SESSION_KEY, null);
    if (!session) return null;
    return getUsers().find((user) => user.id === session.userId) || null;
  };

  const setSession = (userId) => {
    saveJson(SESSION_KEY, { userId, startedAt: new Date().toISOString() });
  };

  const register = ({ name, email, password, type }) => {
    const users = getUsers();
    const cleanEmail = normalize(email);

    if (users.some((user) => user.email === cleanEmail)) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    if (password.length < 6) {
      throw new Error("A senha precisa ter pelo menos 6 caracteres.");
    }

    const user = {
      id: createId(),
      name: name.trim(),
      email: cleanEmail,
      password,
      type,
      createdAt: new Date().toISOString(),
      quizResults: []
    };

    users.push(user);
    saveUsers(users);
    setSession(user.id);
    return user;
  };

  const login = ({ email, password }) => {
    const cleanEmail = normalize(email);
    const user = getUsers().find(
      (account) => account.email === cleanEmail && account.password === password
    );

    if (!user) {
      throw new Error("E-mail ou senha incorretos.");
    }

    setSession(user.id);
    return user;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = `${getRelativePrefix()}login.html`;
  };

  const recordQuizResult = ({ materia, titulo, score, total, percent }) => {
    const currentUser = getCurrentUser();
    const quizEntry = {
      id: createId(),
      materia,
      titulo,
      score,
      total,
      percent,
      userId: currentUser?.id || null,
      playerName: currentUser?.name || "Visitante",
      date: new Date().toISOString()
    };

    const quizScores = readJson(QUIZ_SCORES_KEY, []);
    quizScores.push(quizEntry);
    quizScores.sort((a, b) => b.percent - a.percent || b.score - a.score);
    saveJson(QUIZ_SCORES_KEY, quizScores.slice(0, 150));

    if (currentUser) {
      const users = getUsers();
      const userIndex = users.findIndex((user) => user.id === currentUser.id);
      if (userIndex >= 0) {
        users[userIndex].quizResults = users[userIndex].quizResults || [];
        users[userIndex].quizResults.unshift(quizEntry);
        users[userIndex].quizResults = users[userIndex].quizResults.slice(0, 20);
        saveUsers(users);
      }
    }

    return quizEntry;
  };

  const getQuizRanking = (materia, limit = 10) => {
    return readJson(QUIZ_SCORES_KEY, [])
      .filter((score) => score.materia === materia)
      .sort((a, b) => b.percent - a.percent || b.score - a.score)
      .slice(0, limit);
  };

  const getProgress = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    return currentUser.quizResults || [];
  };

  const getGameScores = () => readJson(GAME_SCORES_KEY, []);

  const saveGameScores = (scores) => {
    saveJson(GAME_SCORES_KEY, scores);
  };

  const recordGameScore = ({ mode, title, score, correct, wrong, bestStreak, duration }) => {
    const currentUser = getCurrentUser();
    const scores = getGameScores();
    const entry = {
      id: createId(),
      mode,
      title,
      score,
      correct,
      wrong,
      bestStreak,
      duration,
      userId: currentUser?.id || null,
      playerName: currentUser?.name || "Visitante",
      date: new Date().toISOString()
    };

    scores.push(entry);
    scores.sort((a, b) => b.score - a.score || b.correct - a.correct);
    saveGameScores(scores.slice(0, 100));
    return entry;
  };

  const getGameRanking = (mode, limit = 10) => {
    return getGameScores()
      .filter((score) => score.mode === mode)
      .sort((a, b) => b.score - a.score || b.correct - a.correct)
      .slice(0, limit);
  };

  const getUserGameScores = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];

    return getGameScores()
      .filter((score) => score.userId === currentUser.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const renderAuthStatus = () => {
    document.querySelectorAll("[data-auth-status]").forEach((container) => {
      const user = getCurrentUser();
      const prefix = getRelativePrefix();

      if (!user) {
        container.innerHTML = `<a href="${prefix}login.html">Entrar</a>`;
        return;
      }

      const firstName = escapeHtml(user.name.split(" ")[0]);
      container.innerHTML = `
        <a href="${prefix}perfil.html">Olá, ${firstName}</a>
        <button type="button" data-auth-logout>Sair</button>
      `;
    });
  };

  const renderProfile = () => {
    const container = document.querySelector("[data-profile]");
    if (!container) return;

    const user = getCurrentUser();
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const results = getProgress();
    const gameScores = getUserGameScores();
    const bestPercent = results.length
      ? Math.max(...results.map((result) => result.percent))
      : 0;
    const bestGameScore = gameScores.length
      ? Math.max(...gameScores.map((result) => result.score))
      : 0;
    const average = results.length
      ? Math.round(results.reduce((sum, result) => sum + result.percent, 0) / results.length)
      : 0;

    container.innerHTML = `
      <section class="profile-hero">
        <div>
          <p class="eyebrow">Perfil ${escapeHtml(user.type)}</p>
          <h2>${escapeHtml(user.name)}</h2>
          <p>${escapeHtml(user.email)}</p>
        </div>
        <a class="primary-link" href="Bitacademy.html#disciplinas">Continuar estudando</a>
      </section>

      <section class="profile-dashboard">
        <div class="profile-summary">
          <article>
            <span>Quizzes feitos</span>
            <strong>${results.length}</strong>
          </article>
          <article>
            <span>Média geral</span>
            <strong>${average}%</strong>
          </article>
          <article>
            <span>Melhor resultado</span>
            <strong>${bestPercent}%</strong>
          </article>
          <article>
            <span>Recorde infinito</span>
            <strong>${bestGameScore}</strong>
          </article>
        </div>

        <div class="profile-next-step">
          <p class="eyebrow">Próximo passo</p>
          <h2>${results.length ? "Revise uma nova disciplina" : "Faça seu primeiro quiz"}</h2>
          <p>${results.length ? "Escolha outra matéria para ampliar seu histórico de desempenho." : "Ao finalizar um quiz logado, o resultado aparece automaticamente aqui."}</p>
          <a class="secondary-link" href="Jogos/matematica-infinita.html">Jogar modo infinito</a>
        </div>
      </section>

      <section>
        <h2>Histórico de quizzes</h2>
        ${results.length ? `
          <div class="result-list">
            ${results.map((result) => `
              <article>
                <div>
                  <strong>${escapeHtml(result.titulo)}</strong>
                  <span>${new Date(result.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <b>${result.score}/${result.total} (${result.percent}%)</b>
              </article>
            `).join("")}
          </div>
        ` : '<p>Você ainda não concluiu nenhum quiz. Escolha uma disciplina e comece quando quiser.</p>'}
      </section>
    `;
  };

  const bindLoginPage = () => {
    const tabs = document.querySelectorAll("[data-auth-tab]");
    const panels = document.querySelectorAll("[data-auth-panel]");
    const message = document.querySelector("[data-auth-message]");

    const showPanel = (target) => {
      tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.authTab === target));
      panels.forEach((panel) => panel.hidden = panel.dataset.authPanel !== target);
      if (message) message.textContent = "";
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => showPanel(tab.dataset.authTab));
    });

    document.querySelector("[data-login-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;

      try {
        login({
          email: form.email.value,
          password: form.senha.value
        });
        window.location.href = "perfil.html";
      } catch (error) {
        message.textContent = error.message;
      }
    });

    document.querySelector("[data-register-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;

      try {
        register({
          name: form.nome.value,
          email: form.email.value,
          password: form.senha.value,
          type: form.tipo.value
        });
        window.location.href = "perfil.html";
      } catch (error) {
        message.textContent = error.message;
      }
    });
  };

  const bindHomeTabs = () => {
    const tabs = document.querySelectorAll("[data-home-tab]");
    const panels = document.querySelectorAll("[data-home-panel]");
    if (!tabs.length || !panels.length) return;

    const showPanel = (target) => {
      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.homeTab === target);
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.homePanel === target;
        panel.hidden = !isActive;
        panel.classList.toggle("active", isActive);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => showPanel(tab.dataset.homeTab));
    });
  };

  const bindSubjectExperience = () => {
    const page = document.body;
    if (!page.classList.contains("subject-page")) return;

    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const main = document.querySelector("main");
    const intro = document.getElementById("introducao");
    if (!header || !nav || !main || !intro) return;

    const title = page.dataset.subjectTitle || "Disciplina";
    const icon = page.dataset.subjectIcon || "📘";
    const area = page.dataset.subjectArea || "Trilha de estudo";
    const accent = page.dataset.subjectAccent || "#6366f1";
    const quizHref = page.dataset.subjectQuiz || "#";
    const topicLinks = Array.from(nav.querySelectorAll("a[href^='#']")).slice(0, 3);
    const firstTopicHref = topicLinks[0]?.getAttribute("href") || "#introducao";

    page.style.setProperty("--subject-accent", accent);
    header.classList.add("subject-hero");
    nav.classList.add("subject-nav");
    main.classList.add("subject-main");

    nav.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("|")) {
        node.textContent = " ";
      }
    });

    if (!header.querySelector(".subject-visual")) {
      header.insertAdjacentHTML("beforeend", `
        <div class="subject-visual" aria-hidden="true">
          <div class="visual-card main">
            <span>${icon}</span>
            <strong>${escapeHtml(title)}</strong>
            <small>${escapeHtml(area)}</small>
          </div>
          <div class="visual-card mini top">${topicLinks[0] ? escapeHtml(topicLinks[0].textContent) : "Conceitos"}</div>
          <div class="visual-card mini middle">${topicLinks[1] ? escapeHtml(topicLinks[1].textContent) : "Exemplos"}</div>
          <div class="visual-card mini bottom">${topicLinks[2] ? escapeHtml(topicLinks[2].textContent) : "Prática"}</div>
        </div>
      `);
    }

    if (!document.querySelector(".subject-path")) {
      intro.insertAdjacentHTML("afterend", `
        <section class="subject-path" aria-label="Trilha sugerida">
          <article>
            <span>1</span>
            <div>
              <strong>Entenda a base</strong>
              <p>Leia a introdução para saber por que esta matéria importa.</p>
            </div>
            <a href="#introducao">Abrir</a>
          </article>
          <article>
            <span>2</span>
            <div>
              <strong>Explore os tópicos</strong>
              <p>Avance pelos assuntos principais em uma ordem mais clara.</p>
            </div>
            <a href="${firstTopicHref}">Ver tópicos</a>
          </article>
          <article>
            <span>3</span>
            <div>
              <strong>Pratique</strong>
              <p>Finalize com quiz ou jogo para testar sua retenção.</p>
            </div>
            <a href="${quizHref}">Praticar</a>
          </article>
        </section>
      `);
    }

    Array.from(main.querySelectorAll("section")).forEach((section) => {
      const isSpecialSection = section.classList.contains("subject-path")
        || section.classList.contains("math-game-callout");

      if (section.id !== "introducao" && !isSpecialSection) {
        section.classList.add("subject-topic");
      }
    });
  };

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-auth-logout]")) {
      logout();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    bindLoginPage();
    bindHomeTabs();
    bindSubjectExperience();
    renderAuthStatus();
    renderProfile();
  });

  return {
    getCurrentUser,
    getGameRanking,
    getProgress,
    getQuizRanking,
    recordGameScore,
    login,
    logout,
    recordQuizResult,
    register
  };
})();
