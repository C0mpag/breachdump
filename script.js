const navLinks = document.querySelectorAll('nav a[href^="#"]');
const form = document.getElementById('quote-form');
const formMessage = document.getElementById('form-message');
const yearEl = document.getElementById('year');
const accordionTriggers = document.querySelectorAll('.accordion-trigger');

// Smooth scrolling
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Current year
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Accordion logic
accordionTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    accordionTriggers.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling.hidden = true;
    });
    trigger.setAttribute('aria-expanded', String(!expanded));
    trigger.nextElementSibling.hidden = expanded;
  });
});

// Form validation and submission
const validators = {
  fullName: (value) => value.trim().length >= 2 || 'Please enter your full name.',
  phone: (value) => /[0-9()\-\s+]{6,}/.test(value) || 'Please enter a valid phone number.',
  email: (value) => !value || /.+@.+\..+/.test(value) || 'Please enter a valid email address.',
  suburb: (value) => value.trim().length >= 2 || 'Please tell us your suburb.',
  service: (value) => value !== '' || 'Please select a service type.',
  consent: (checked) => checked || 'Please confirm we can contact you about your quote.',
};

function clearErrors() {
  form.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
}

function showError(input, message) {
  const errorEl = input.closest('label').querySelector('.error');
  if (errorEl) errorEl.textContent = message;
}

function validateForm() {
  clearErrors();
  let isValid = true;
  const formData = new FormData(form);

  Object.keys(validators).forEach((key) => {
    if (key === 'consent') {
      const checkbox = form.querySelector('input[name="consent"]');
      const valid = validators[key](checkbox.checked);
      if (valid !== true) {
        isValid = false;
        showError(checkbox, valid);
      }
      return;
    }

    const value = formData.get(key) || '';
    const valid = validators[key](value.toString());
    if (valid !== true) {
      isValid = false;
      const field = form.querySelector(`[name="${key}"]`);
      if (field) showError(field, valid);
    }
  });

  return isValid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = '';

  if (!validateForm()) {
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  console.log('Quote request submitted:', data);
  formMessage.textContent = 'Thanks! We’ve received your request and will get back to you shortly.';
  formMessage.classList.add('success');
  form.reset();
});
