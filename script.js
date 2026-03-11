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

const animateStat = (element) => {
  const target = Number(element.dataset.count || 0);
  const suffix = element.dataset.suffix || '';
  const hasDecimal = !Number.isInteger(target);
  const duration = 1600;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    element.textContent = `${formatValue(current, hasDecimal)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${formatValue(target, hasDecimal)}${suffix}`;
    }
  };

  requestAnimationFrame(step);
};

if (statValues.length > 0) {
  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statValues.forEach(animateStat);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );

  statsObserver.observe(statValues[0]);
}
