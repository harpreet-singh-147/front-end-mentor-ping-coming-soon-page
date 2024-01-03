const formEl = document.querySelector('.launching-soon__form');
const emailInput = document.querySelector('.launching-soon__form-input');
const emailError = document.querySelector('.launching-soon__form-error');
const emailInputLabel = document.querySelector('.launching-soon__form-label');
const submitBtn = document.querySelector('.launching-soon__btn-submit');

const updateLabelPosition = () => {
  emailInput.classList.toggle('has-content', emailInput.value.trim() !== '');
};

const validateEmail = email => {
  const value = email.trim();
  let isValid = true;
  let errorMessage = '';

  if (!value) {
    isValid = false;
    errorMessage = 'Whoops! It looks like you forgot to add your email';
  }

  if (value) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please provide a valid email address';
    }
  }

  return { isValid, errorMessage };
};

const displayError = (input, message) => {
  emailError.textContent = message;
  emailError.style.opacity = message ? 1 : '';
  emailError.style.visibility = message ? 'visible' : '';
  emailInputLabel.style.color = message ? 'hsl(354, 100%, 66%)' : '';
  input.style.boxShadow = message ? '0px 0px 5px hsl(354, 100%, 66%)' : '';
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  updateErrorDisplay(message);
};

const updateErrorDisplay = message => {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 500 && windowWidth >= 310 && message) {
    emailError.classList.add('launching-soon__form-error-mobile');
    emailError.classList.remove('launching-soon__form-error-mobile-small');
    submitBtn.style.marginTop = '4.5rem';
  } else if (windowWidth <= 310 && message) {
    emailError.classList.add('launching-soon__form-error-mobile-small');
    emailError.classList.remove('launching-soon__form-error-mobile');
    submitBtn.style.marginTop = '2.7rem';
  } else {
    emailError.classList.remove(
      'launching-soon__form-error-mobile-small',
      'launching-soon__form-error-mobile'
    );
    submitBtn.style.marginTop = '0';
  }
};

const handleSubmit = e => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const { isValid, errorMessage } = validateEmail(email);

  if (!isValid) {
    displayError(emailInput, errorMessage);
    emailInput.focus();
  } else {
    displayError(emailInput, '');
    emailInput.value = '';
    emailInput.classList.remove('has-content');
    console.log({ [emailInput.name]: email });
  }
};

emailInput.addEventListener('blur', () => {
  displayError(emailInput, '');
  submitBtn.classList.remove('add-btn-shadow');
  updateLabelPosition();
});

emailInput.addEventListener('focus', () => {
  submitBtn.classList.add('add-btn-shadow');
});

formEl.addEventListener('submit', handleSubmit);
