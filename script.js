/*********************************
  1) Toggle Code Visibility on Project Cards
**********************************/
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    // If user clicked on the "Copy Code" button, don't toggle container
    if (
      e.target.classList.contains("copy-btn") ||
      e.target.parentNode.classList.contains("copy-btn")
    ) {
      return;
    }
    const codeContainer = this.querySelector(".code-container");
    if (codeContainer && codeContainer.style.display === "block") {
      codeContainer.style.display = "none";
    } else if (codeContainer) {
      codeContainer.style.display = "block";
    }
  });
});

/*********************************
  2) Copy-to-Clipboard Functionality
**********************************/
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent toggling code container
    const targetId = button.getAttribute("data-target");
    const codeSnippet = document.getElementById(targetId).innerText;
    navigator.clipboard.writeText(codeSnippet).then(() => {
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
      }, 2000);
    });
  });
});

/*********************************
  3) Search/Filter Projects (index.html only)
**********************************/
const searchInput = document.getElementById("search-input");
if (searchInput) {
  const projectsGrid = document.getElementById("projects-grid");
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const projectCards = projectsGrid.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const title = card.getAttribute("data-title").toLowerCase();
      const description = card.getAttribute("data-description").toLowerCase();
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/*********************************
  4) Cookie Banner Logic
**********************************/
const cookieBanner = document.getElementById("cookie-banner");
const acceptCookiesBtn = document.getElementById("accept-cookies");

// Check if cookies accepted previously
if (localStorage.getItem("cookiesAccepted") === "true") {
  cookieBanner.style.display = "none";
}

if (acceptCookiesBtn) {
  acceptCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
  });
}
