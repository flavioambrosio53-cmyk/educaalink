document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "✕" : "☰";
    });
  }

  const subjectSearch = document.getElementById("subjectSearch");
  if (subjectSearch) {
    const cards = [...document.querySelectorAll(".discipline-card")];
    const count = document.getElementById("subjectCount");
    const empty = document.getElementById("noSubjects");
    const initial = new URLSearchParams(location.search).get("q") || "";
    subjectSearch.value = initial;
    const filter = () => {
      const q = subjectSearch.value.trim().toLocaleLowerCase("pt-BR");
      let visible = 0;
      cards.forEach(card => {
        const match = card.dataset.name.toLocaleLowerCase("pt-BR").includes(q);
        card.classList.toggle("hidden", !match);
        if (match) visible++;
      });
      count.textContent = `${visible} ${visible === 1 ? "disciplina encontrada" : "disciplinas encontradas"}`;
      empty.classList.toggle("hidden", visible !== 0);
    };
    subjectSearch.addEventListener("input", filter); filter();
  }

  const tutorSearch = document.getElementById("tutorSearch");
  const tutorSubject = document.getElementById("tutorSubject");
  if (tutorSearch && tutorSubject) {
    const cards = [...document.querySelectorAll(".tutor-card")];
    const empty = document.getElementById("noTutors");
    const params = new URLSearchParams(location.search);
    tutorSubject.value = params.get("disciplina") || "";
    const filter = () => {
      const q = tutorSearch.value.trim().toLocaleLowerCase("pt-BR");
      const subject = tutorSubject.value.toLocaleLowerCase("pt-BR");
      let visible = 0;
      cards.forEach(card => {
        const nameMatch = card.dataset.name.toLocaleLowerCase("pt-BR").includes(q);
        const subjectMatch = !subject || (card.dataset.subject + " " + card.textContent).toLocaleLowerCase("pt-BR").includes(subject);
        const show = nameMatch && subjectMatch;
        card.classList.toggle("hidden", !show);
        if (show) visible++;
      });
      empty.classList.toggle("hidden", visible !== 0);
    };
    tutorSearch.addEventListener("input", filter);
    tutorSubject.addEventListener("change", filter); filter();
  }

  const roleButtons = document.querySelectorAll(".role-option");
  const roleInput = document.getElementById("accountRole");
  if (roleButtons.length && roleInput) {
    const requested = new URLSearchParams(location.search).get("tipo");
    if (requested === "tutor") {
      roleButtons.forEach(b => b.classList.toggle("selected", b.dataset.role === "tutor"));
      roleInput.value = "tutor";
    }
    roleButtons.forEach(button => button.addEventListener("click", () => {
      roleButtons.forEach(b => b.classList.toggle("selected", b === button));
      roleInput.value = button.dataset.role;
    }));
  }

  const toast = document.querySelector(".toast");
  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 4200);
  };

  const register = document.getElementById("registerForm");
  if (register) register.addEventListener("submit", event => {
    event.preventDefault();
    showToast("Demonstração: o cadastro ainda não está conectado a um servidor. Nenhum dado foi enviado.");
    register.reset();
  });

  const login = document.getElementById("loginForm");
  if (login) login.addEventListener("submit", event => {
    event.preventDefault();
    showToast("Demonstração: o login real será implementado com PHP e MySQL.");
    login.reset();
  });
});
