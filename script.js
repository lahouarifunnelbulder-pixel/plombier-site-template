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

const initStatsAnimation = () => {
  const statsSection = document.getElementById('stats');
  const statValues = document.querySelectorAll('.stat-value');
  if (!statsSection || statValues.length === 0) {
    return;
  }

  let hasAnimated = false;

  const formatValue = (value, hasDecimal) => {
    if (hasDecimal) {
      return value.toFixed(1);
    }
    return Math.floor(value).toString();
  };

  const animateStat = (element) => {
    const target = Number(element.dataset.target || element.dataset.count || 0);
    const suffix = element.dataset.suffix || '';
    const hasDecimal = String(target).includes('.');
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

  const runAnimationOnce = () => {
    if (hasAnimated) {
      return;
    }

    hasAnimated = true;
    statValues.forEach(animateStat);
  };

  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          runAnimationOnce();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    statsObserver.observe(statsSection);
  } else {
    runAnimationOnce();
  }
};

const initScrollReveal = () => {
  const revealItems = Array.from(document.querySelectorAll('.reveal-on-scroll'));
  if (revealItems.length === 0) {
    return;
  }

  const reveal = (element) => element.classList.add('visible');

  const revealInViewport = () => {
    revealItems.forEach((item) => {
      if (item.classList.contains('visible')) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= viewportHeight * 0.92 && rect.bottom >= 0) {
        reveal(item);
      }
    });
  };

  if (!('IntersectionObserver' in window)) {
    revealInViewport();
    window.addEventListener('scroll', revealInViewport, { passive: true });
    window.addEventListener('resize', revealInViewport);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
  );

  revealItems.forEach((item) => observer.observe(item));
  revealInViewport();
  window.addEventListener('load', revealInViewport, { once: true });
};

const initPage = () => {
  initStatsAnimation();
  initScrollReveal();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
