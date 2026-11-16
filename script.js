// -- Sélection des éléments --
const form = document.querySelector("#comment-form");
const authorInput = document.querySelector("#author");
const commentInput = document.querySelector("#comment");
const errorMessage = document.querySelector("#form-error");
const commentsList = document.querySelector("#comments-list");

// -- Affichage / masquage de l'erreur --
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.hidden = true;
}

// -- Suppression d'un commentaire --
function activateDeleteButton(button) {
  button.addEventListener("click", function () {
    const card = button.parentElement;
    card.remove();
  });
}

// -- Création d'un commentaire --
function createComment(author, text) {
  const card = document.createElement("article");
  card.classList.add("comment");

  const authorElement = document.createElement("h3");
  authorElement.classList.add("comment-author");
  authorElement.textContent = author;

  const textElement = document.createElement("p");
  textElement.classList.add("comment-text");
  textElement.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("btn-delete");
  deleteButton.textContent = "🗑️ Supprimer";
  activateDeleteButton(deleteButton);

  card.appendChild(authorElement);
  card.appendChild(textElement);
  card.appendChild(deleteButton);

  return card;
}

// -- Formulaire --
form.addEventListener("submit", function (event) {
  event.preventDefault(); // pas de rechargement de la page

  const author = authorInput.value.trim();
  const text = commentInput.value.trim();

  if (author.length < 2) {
    showError("Le nom doit contenir au moins 2 caractères.");
    return;
  }

  if (text.length < 10) {
    showError("Le commentaire doit contenir au moins 10 caractères.");
    return;
  }

  // Formulaire valide : ajout du commentaire en haut de la liste
  commentsList.prepend(createComment(author, text));
  form.reset();
  hideError();
});

// -- Boutons Supprimer  --
const existingDeleteButtons = document.querySelectorAll(".btn-delete");
existingDeleteButtons.forEach(function (button) {
  activateDeleteButton(button);
});