window.BitAcademyAuth = (() => {
  const USERS_KEY = "bitacademy.users";
  const SESSION_KEY = "bitacademy.session";

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
    window.location.href = "login.html";
  };

  const recordQuizResult = ({ materia, titulo, score, total, percent }) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const users = getUsers();
    const userIndex = users.findIndex((user) => user.id === currentUser.id);
    if (userIndex < 0) return;

    users[userIndex].quizResults = users[userIndex].quizResults || [];
    users[userIndex].quizResults.unshift({
      materia,
      titulo,
      score,
      total,
      percent,
      date: new Date().toISOString()
    });

    users[userIndex].quizResults = users[userIndex].quizResults.slice(0, 20);
    saveUsers(users);
  };

  const getProgress = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    return currentUser.quizResults || [];
  };

  const renderAuthStatus = () => {
    document.querySelectorAll("[data-auth-status]").forEach((container) => {
      const user = getCurrentUser();

      if (!user) {
        container.innerHTML = '<a href="login.html">Entrar</a>';
        return;
      }

      const firstName = escapeHtml(user.name.split(" ")[0]);
      container.innerHTML = `
        <a href="perfil.html">Olá, ${firstName}</a>
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
    const bestPercent = results.length
      ? Math.max(...results.map((result) => result.percent))
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
        </div>

        <div class="profile-next-step">
          <p class="eyebrow">Próximo passo</p>
          <h2>${results.length ? "Revise uma nova disciplina" : "Faça seu primeiro quiz"}</h2>
          <p>${results.length ? "Escolha outra matéria para ampliar seu histórico de desempenho." : "Ao finalizar um quiz logado, o resultado aparece automaticamente aqui."}</p>
          <a class="secondary-link" href="Quiz/quiz-matematica.html">Abrir quiz</a>
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

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-auth-logout]")) {
      logout();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    bindLoginPage();
    bindHomeTabs();
    renderAuthStatus();
    renderProfile();
  });

  return {
    getCurrentUser,
    getProgress,
    login,
    logout,
    recordQuizResult,
    register
  };
})();
