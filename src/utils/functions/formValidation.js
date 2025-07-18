const regex = {
  username: /^[a-zA-Z0-9_]{3,16}$/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/,
};

const validateSignupForm = (formData) => {
  const errors = {};

  if (!regex.username.test(formData.username)) {
    errors.username =
      "Username must be 3-16 characters long and can only contain letters, numbers, and underscores.";
  }
  if (!regex.email.test(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!regex.password.test(formData.password)) {
    errors.password =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return errors;
};

const validateLoginForm = (formData) => {
  const errors = {};

  if (!regex.email.test(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!regex.password.test(formData.password)) {
    errors.password =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return errors;
};

export { validateSignupForm, validateLoginForm };
