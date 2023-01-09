import { AbstractControl, FormControl } from '@angular/forms';
import { noWhitespace } from './no-whitespace.validator';

describe('noWhitespaceValidator', () => {
  const control: AbstractControl = new FormControl();

  it('should return null when there is no value', () => {
    control.setValue('');
    expect(noWhitespace(control)).toBeNull();
  });

  it('should return null when the value has other characters than spaces', () => {
    control.setValue(' some  thing ');

    expect(noWhitespace(control)).toBeNull();
  });

  it('should return null when the value has no spaces', () => {
    control.setValue('valid');

    expect(noWhitespace(control)).toBeNull();
  });

  it('should return an error when the value consists one space', () => {
    control.setValue(' ');

    expect(noWhitespace(control)).toEqual({ noWhitespace: true });
  });

  it('should return an error when the value consists of only spaces', () => {
    control.setValue('   ');

    expect(noWhitespace(control)).toEqual({ noWhitespace: true });
  });
});
