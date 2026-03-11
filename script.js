const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.getElementById('devis-form');
const feedback = document.getElementById('form-feedback');

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      feedback.textContent = 'Merci de renseigner tous les champs du formulaire.';
      feedback.className = 'form-feedback error';
      return;
    }

    feedback.textContent = 'Votre demande a bien été envoyée. Nous vous recontactons rapidement.';
    feedback.className = 'form-feedback success';
    form.reset();
  });
}
