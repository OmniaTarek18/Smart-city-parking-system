export const validateLotForm = (formData) => {
  const errors = {};

  // validate name
  if (!formData.name?.trim()) {
    errors.name = 'Lot name is required';
  }

  // validate location (street, city, country)
  if (!formData.location?.trim()) {
    errors.location = 'Location is required';
  } else {
    const locationRegex = /^[a-zA-Z0-9\s,]+(?:,\s*[a-zA-Z\s]+){2}$/;
    if (!locationRegex.test(formData.location)) {
      errors.location = 'Location must be in the format: street, city, country';
    }
  }

  // validate capacity: at least one type of parking spot should be greater than 0
  if (!formData.capacity?.regular && !formData.capacity?.disabled && !formData.capacity?.evCharging) {
    errors.capacity = 'At least one type of parking spot is required';
  }

  // validate pricing for each type of spot
  ['regular', 'disabled', 'evCharging'].forEach((type) => {
    const capacity = formData.capacity[type];
    const pricing = formData.pricing[type];

    if (capacity > 0) {
      // if capacity is greater than 0 pricing validation is required
      if (!pricing?.baseRate || pricing.baseRate <= 0) {
        errors[`${type}.baseRate`] = `${type.charAt(0).toUpperCase() + type.slice(1)} base rate must be greater than 0`;
      }
      if (pricing?.congestionRate < 0) {
        errors[`${type}.congestionRate`] = `${type.charAt(0).toUpperCase() + type.slice(1)} congestion rate must be 0 or greater`;
      }
    } else if (capacity === 0) {
      // if capacity is 0 baseRate and congestionRate can be 0 as well
      if (!(typeof pricing?.baseRate === "undefined") && pricing?.baseRate !== 0) {
        errors[`${type}.baseRate`] = `${type.charAt(0).toUpperCase() + type.slice(1)} base rate must be 0 if the capacity is 0`;
      }
      if (!(typeof pricing?.congestionRate === "undefined")&& pricing?.congestionRate !== 0) {
        console.log(pricing.congestionRate)
        errors[`${type}.congestionRate`] = `${type.charAt(0).toUpperCase() + type.slice(1)} congestion rate must be 0 if the capacity is 0`;
      }
    }
  });

  return errors;
};
