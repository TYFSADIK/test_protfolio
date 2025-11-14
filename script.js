document.addEventListener("DOMContentLoaded", function () {
  // Hamburger / nav drawer
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const body = document.body;

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      body.classList.toggle("nav-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close nav when clicking a link (for mobile)
    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("open");
        body.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // "More" buttons: reveal extra items within the target section
  const moreButtons = document.querySelectorAll(".more-button");

  moreButtons.forEach(function (button) {
    const targetSelector = button.getAttribute("data-target");
    if (!targetSelector) return;

    const section = document.querySelector(targetSelector);
    if (!section) return;

    button.addEventListener("click", function () {
      const hiddenItems = section.querySelectorAll(".hidden-item");
      const isExpanded = button.getAttribute("data-expanded") === "true";

      hiddenItems.forEach(function (item) {
        item.style.display = isExpanded ? "none" : "";
      });

      button.textContent = isExpanded
        ? buttonOriginalText(button)
        : buttonExpandedText(button);

      button.setAttribute("data-expanded", String(!isExpanded));
    });
  });

  function buttonOriginalText(button) {
    const target = button.getAttribute("data-target");
    if (!target) return "More";

    if (target === "#blogs") return "More blog posts";
    if (target === "#notes") return "More notes";
    if (target === "#scrolls") return "More scrolls";
    if (target === "#devlogs") return "More devlogs";
    if (target === "#shared-links") return "More links";
    if (target === "#infosec") return "More infosec notes";

    return "More";
  }

  function buttonExpandedText(button) {
    const target = button.getAttribute("data-target");
    if (!target) return "Show less";

    if (target === "#blogs") return "Show fewer blog posts";
    if (target === "#notes") return "Show fewer notes";
    if (target === "#scrolls") return "Show fewer scrolls";
    if (target === "#devlogs") return "Show fewer devlogs";
    if (target === "#shared-links") return "Show fewer links";
    if (target === "#infosec") return "Show fewer infosec notes";

    return "Show less";
  }

  // Activity stats: count posts and notes
  const blogCount = document.querySelectorAll("#blogs .post-item").length;
  const scrollCount = document.querySelectorAll("#scrolls .scroll-item").length;
  const devlogCount = document.querySelectorAll("#devlogs .devlog-item").length;
  const totalPosts = blogCount + scrollCount + devlogCount;

  const notesCount = document.querySelectorAll("#notes .note-item").length;

  const totalPostsSpan = document.getElementById("total-posts-count");
  const totalNotesSpan = document.getElementById("total-notes-count");

  if (totalPostsSpan) totalPostsSpan.textContent = String(totalPosts);
  if (totalNotesSpan) totalNotesSpan.textContent = String(notesCount);

  // Footer year
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
