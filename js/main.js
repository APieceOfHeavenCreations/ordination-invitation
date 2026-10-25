document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.reveal');
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('is-visible');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });

    sections.forEach(section => {
      if (section !== hero) observer.observe(section);
    });
  } else {
    sections.forEach(section => section.classList.add('is-visible'));
  }
});


/* Gentle, user-controlled instrumental music */
(() => {
  const audio = document.getElementById("invitationMusic");
  const button = document.getElementById("musicButton");
  const icon = document.getElementById("musicIcon");

  if (!audio || !button || !icon) return;

  button.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        button.classList.add("is-playing");
        button.setAttribute("aria-pressed", "true");
        button.setAttribute("aria-label", "Pause instrumental music");
        icon.textContent = "🔊";
      } catch (error) {
        button.setAttribute("aria-label", "Instrumental music file not found");
        console.warn("Add assets/Gregorian Chant of Hope.mp3 to enable music.", error);
      }
    } else {
      audio.pause();
      button.classList.remove("is-playing");
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", "Play instrumental music");
      icon.textContent = "🔇";
    }
  });
})();
