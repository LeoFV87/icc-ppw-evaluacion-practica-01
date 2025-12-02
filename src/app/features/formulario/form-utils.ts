import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {

  // 1. Verifica si el campo tiene errores Y ha sido tocado
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  // 2. Obtiene el objeto de errores y llama a la función de texto
  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};
    return this.getTextError(errors);
  }

  // 3. Mapea el objeto de errores a un mensaje de texto
  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'email':
          return 'Formato de correo inválido';
      }
    }
    return null;
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length == 0) return null;

    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }




}
