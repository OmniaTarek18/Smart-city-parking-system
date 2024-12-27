export const validateLotForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'Lot name is required';
  }
  
  if (!formData.location?.trim()) {
    errors.location = 'Location is required';
  }
  
  if (!formData.capacity?.regular && !formData.capacity?.disabled && !formData.capacity?.evCharging) {
    errors.capacity = 'At least one type of parking spot is required';
  }
  
  if (!formData.pricing?.baseRate || formData.pricing.baseRate <= 0) {
    errors.baseRate = 'Base rate must be greater than 0';
  }
  
  if (!formData.pricing?.congestionRate || formData.pricing.congestionRate < 0) {
    errors.congestionRate = 'Congestion rate must be 0 or greater';
  }
  
  return errors;
};