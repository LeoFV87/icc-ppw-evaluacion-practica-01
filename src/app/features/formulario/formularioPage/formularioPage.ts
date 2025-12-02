import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from "@angular/router";
import { FormUtils } from '../form-utils';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formularioPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioPage {

  formUtils = FormUtils;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  myForm: FormGroup = this.fb.group({
  
    correo: ['', [Validators.required, Validators.email]],
    contrasenia: [0, [Validators.required, Validators.minLength(8)]]

  });


  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log('Formulario válido:', this.myForm.value);

    this.router.navigate(['/home']); 

  }

}

