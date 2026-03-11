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

const statValues = document.querySelectorAll('.stat-value');
let statsAnimated = false;

const formatValue = (value, hasDecimal) => {
  if (hasDecimal) {
    return value.toFixed(1);
  }
  return Math.floor(value).toString();
};

const counters = document.querySelectorAll(".stat-number");

const animateCounters = () => {

  counters.forEach(counter => {

    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {

      const increment = target / 100;

      count += increment;

      if(count < target){
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      }
      else{
        counter.innerText = target + "+";
      }

    }

    update();

  });

};

const observer = new IntersectionObserver(entries => {

  if(entries[0].isIntersecting){
    animateCounters();
    observer.disconnect();
  }

});

observer.observe(document.querySelector(".stats-section"));
