export const cuisines = ['Italian', 'Mexican', 'French', 'Chinese', 'Indian'];

export const validateName = (name) => {
  const trimmedName = name ? name.trim() : '';
  if (!trimmedName) {
    return 'Restaurant name is required.';
  }
  if (trimmedName.length < 3) {
    return 'Name must be at least 3 characters long.';
  }
  if (!/^[a-zA-Z0-9\s]+$/.test(trimmedName)) {
    return 'Name can only contain letters, numbers, and spaces.';
  }
  return '';
};

export const validateCuisine = (cuisine) => {
  if (!cuisine) {
    return 'Cuisine is required.';
  }
  if (!cuisines.includes(cuisine)) {
    return 'Please select a valid cuisine.';
  }
  return '';
};

export const validateLocation = (location) => {
  const trimmedLocation = location ? location.trim() : '';
  if (!trimmedLocation) {
    return 'Location is required.';
  }
  if (trimmedLocation.length < 3) {
    return 'Location must be at least 3 characters long.';
  }
  return '';
};

export const isFormValid = (form, errors) => {
  return (
    !errors.name &&
    !errors.cuisine &&
    !errors.location &&
    form.name?.trim() &&
    form.cuisine &&
    form.location?.trim()
  );
};