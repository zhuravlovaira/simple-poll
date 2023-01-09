import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noWhitespace(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  return control.value.trim().length ? null : { noWhitespace: true };
}
