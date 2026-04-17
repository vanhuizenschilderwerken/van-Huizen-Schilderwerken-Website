(() => {
  const header = document.querySelector('[data-elevate]');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const yearEl = document.getElementById('year');
  const revealEls = document.querySelectorAll('.reveal');

  // Huidig jaar in de footer
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Header elevation bij scrollen
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-elevated', window.scrollY > 6);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobiele navigatie logica
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (!navMenu.classList.contains('is-open')) return;
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('is-open')) return;
      const clickedInside = navMenu.contains(event.target) || navToggle.contains(event.target);
      if (!clickedInside) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Reveal on scroll animaties
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
  }

  // --- Web3Forms Formulier Verwerking ---
  const form = document.getElementById('form') || document.querySelector('form.form');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const formData = new FormData(form);
      // Access Key uit de afbeelding
      formData.append("access_key", "49cb7cab-9879-4162-8548-074c38c97969");

      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Bezig met verzenden...";
      submitBtn.disabled = true;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Visuele feedback voor succes
          submitBtn.textContent = 'Verzonden ✓';
          form.reset();
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2500);
        } else {
          alert("Fout bij verzenden: " + (data.message || "Probeer het later opnieuw."));
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        alert("Er is iets misgegaan. Controleer je internetverbinding.");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
})();

// WhatsApp functionaliteit
document.addEventListener('DOMContentLoaded', () => {
  const whatsappButton = document.getElementById('huizen-whatsapp-button');
  const whatsappChat = document.getElementById('huizen-whatsapp-chat');
  const whatsappClose = document.getElementById('huizen-chat-close');
  const whatsappSend = document.getElementById('huizen-chat-send');
  const whatsappInput = document.getElementById('huizen-chat-input');
  const phone = '31637179335';

  if (whatsappButton && whatsappChat) {
    whatsappButton.addEventListener('click', () => {
      whatsappChat.style.display = 'block';
    });

    if (whatsappClose) {
      whatsappClose.addEventListener('click', () => {
        whatsappChat.style.display = 'none';
      });
    }

    if (whatsappSend && whatsappInput) {
      const sendWhatsAppMessage = () => {
        let message = whatsappInput.value.trim();
        if (message === '') {
          message = 'Hallo, ik heb een vraag.';
        }
        const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
        window.open(url, '_blank');
      };

      whatsappSend.addEventListener('click', sendWhatsAppMessage);

      whatsappInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          sendWhatsAppMessage();
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

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("reviewsTrack");
    const dots = document.querySelectorAll("#reviewsDots .dot");
    const prevBtn = document.querySelector(".reviews-prev");
    const nextBtn = document.querySelector(".reviews-next");

    let currentIndex = 0;
    const totalSlides = 2;

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    prevBtn.addEventListener("click", function () {
      currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
      updateSlider();
    });

    nextBtn.addEventListener("click", function () {
      currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      updateSlider();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        currentIndex = Number(this.dataset.index);
        updateSlider();
      });
    });

    updateSlider();
  });
</script>
