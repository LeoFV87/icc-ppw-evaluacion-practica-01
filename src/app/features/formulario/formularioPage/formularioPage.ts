import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../form-utils';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formularioPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioPage {

  formUtils = FormUtils;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  errorMessage: string | null = null;

  myForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { correo, contrasenia } = this.myForm.value;

    // Usuario quemado
    const USER = {
      email: 'usuario@ups.edu.ec',
      password: '123456'
    };

    // Comprobar credenciales
    if (correo === USER.email && contrasenia === USER.password) {
      this.errorMessage = null;
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
  }
}
