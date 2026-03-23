(() => {
  const header = document.querySelector("[data-elevate]");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const yearEl = document.getElementById("year");

  // Huidig jaar
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Header scroll effect
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobiel menu
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (navMenu.classList.contains("is-open")) {
          navMenu.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.classList.contains("is-open")) return;
      const clickedInside = navMenu.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInside) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length > 0) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  }

  // --- Gecombineerde Web3Forms Sectie ---
  // Zoekt naar zowel .quote-form als #form
  const form = document.querySelector(".quote-form") || document.getElementById('form');
  
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector("button[type='submit']");
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;
      const formData = new FormData(form);
      
      // Access Key uit afbeelding verwerkt
      formData.append("access_key", "49cb7cab-9879-4162-8548-074c38c97969");

      // Visuele feedback start
      submitBtn.textContent = "Bezig met verzenden...";
      submitBtn.disabled = true;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Succes status
          submitBtn.textContent = "Verzonden ✓";
          form.reset();
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2500);
        } else {
          alert("Fout: " + (data.message || "Er ging iets mis."));
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        alert("Kon het formulier niet verzenden. Controleer uw verbinding.");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
})();

// WhatsApp functionaliteit
document.addEventListener("DOMContentLoaded", function () {
  const whatsappButton = document.getElementById("huizen-whatsapp-button");
  const whatsappChat = document.getElementById("huizen-whatsapp-chat");
  const whatsappClose = document.getElementById("huizen-chat-close");
  const whatsappSend = document.getElementById("huizen-chat-send");
  const whatsappInput = document.getElementById("huizen-chat-input");
  const phone = "31637179335";

  if (whatsappButton && whatsappChat) {
    whatsappButton.addEventListener("click", function () {
      whatsappChat.style.display = "block";
    });

    if (whatsappClose) {
      whatsappClose.addEventListener("click", function () {
        whatsappChat.style.display = "none";
      });
    }

    if (whatsappSend && whatsappInput) {
      const sendWA = () => {
        let message = whatsappInput.value.trim();
        if (message === "") message = "Hallo, ik wil graag een offerte aanvragen.";
        const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
        window.open(url, "_blank");
      };

      whatsappSend.addEventListener("click", sendWA);
      whatsappInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          sendWA();
        }
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const swatches = document.querySelectorAll('.swatch');
    const selectedInput = document.getElementById('selected-ral');
    const nameDisplay = document.getElementById('color-display-name');
    const customBtn = document.getElementById('btn-custom-color');
    const customInput = document.getElementById('custom-color-input');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Reset alle selecties
            swatches.forEach(s => s.classList.remove('is-selected'));
            customBtn.classList.remove('is-selected');
            
            // Activeer de geklikte swatch
            swatch.classList.add('is-selected');
            const colorName = swatch.getAttribute('data-name');
            
            // Update waarden
            selectedInput.value = colorName;
            nameDisplay.innerHTML = `Geselecteerd: <strong>${colorName}</strong>`;
            customInput.style.display = 'none';
        });
    });

    customBtn.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('is-selected'));
        customBtn.classList.add('is-selected');
        
        selectedInput.value = "Eigen kleurkeuze";
        nameDisplay.textContent = "Voer hieronder de gewenste kleur in:";
        customInput.style.display = 'block';
        customInput.focus();
    });
});