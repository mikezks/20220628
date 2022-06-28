import { AbstractControl, ValidationErrors } from "@angular/forms";

export function validateCity(control: AbstractControl): ValidationErrors | null {
  const validCities = [
    'Graz', 'Berlin', 'Hamburg'
  ];

  if (control.value && !validCities.includes(control.value)) {
    return {
      city: {
        value: control.value,
        validCities
      }
    };
  }

  return null;
}
