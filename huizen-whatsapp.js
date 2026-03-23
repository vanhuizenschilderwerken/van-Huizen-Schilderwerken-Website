document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("whatsapp-button");
  const dialog = document.getElementById("whatsapp-dialog");
  const closeButton = document.getElementById("whatsapp-dialog-close");
  const sendButton = document.getElementById("whatsapp-dialog-btn");
  const input = document.getElementById("whatsapp-user-input");

  const phone = "31637179335";

  button.addEventListener("click", function () {
    dialog.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    dialog.style.display = "none";
  });

  sendButton.addEventListener("click", function () {
    let message = input.value.trim();

    if (message === "") {
      message = "Hallo, ik heb een vraag.";
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendButton.click();
    }
  });
});