// header scroll shadow
const header = document.querySelector("[data-elevate]");

window.addEventListener("scroll", () => {
if(window.scrollY > 6){
header.classList.add("is-elevated");
}else{
header.classList.remove("is-elevated");
}
});


// mobile menu

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {

navMenu.classList.toggle("is-open");

const open = navMenu.classList.contains("is-open");

navToggle.setAttribute("aria-expanded", open);

});


// reveal animation

const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("is-visible");
}
});

});

revealEls.forEach(el=>observer.observe(el));


// footer year

document.getElementById("year").textContent =
new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  const whatsappButton = document.getElementById("huizen-whatsapp-button");
  const whatsappChat = document.getElementById("huizen-whatsapp-chat");
  const whatsappClose = document.getElementById("huizen-chat-close");
  const whatsappSend = document.getElementById("huizen-chat-send");
  const whatsappInput = document.getElementById("huizen-chat-input");
  const phone = "31637179335";

  if (whatsappButton && whatsappChat && whatsappClose && whatsappSend && whatsappInput) {
    whatsappButton.addEventListener("click", function () {
      whatsappChat.style.display = "block";
    });

    whatsappClose.addEventListener("click", function () {
      whatsappChat.style.display = "none";
    });

    whatsappSend.addEventListener("click", function () {
      let message = whatsappInput.value.trim();

      if (message === "") {
        message = "Hallo, ik heb een vraag.";
      }

      const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
      window.open(url, "_blank");
    });

    whatsappInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        whatsappSend.click();
      }
    });
  }
});

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "49cb7cab-9879-4162-8548-074c38c97969");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});