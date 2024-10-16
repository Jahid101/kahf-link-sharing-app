
export const handleErrorMessage = (errors, name) => {
  if (name in errors) {
    return errors[name]?.message;
  }
  return "";
};

export const changeThemeColor = (primary = '#5F41DC') => {
  document.documentElement.style.setProperty('--color-primary', primary);
};
