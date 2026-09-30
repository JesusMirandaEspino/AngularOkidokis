import { Component, OnInit, inject } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginForm, User } from "./interface";
import { LoginService } from "../../services/loginServices/login-service";
import { UseStateService } from "../../services/stateService/use-state-service";
import { Router } from "@angular/router";
import { AuthService } from "../../security/auth.service";


@Component({
  selector: "app-login",
  imports: [ReactiveFormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login implements OnInit {
  form!: FormGroup;

  private loginService = inject(LoginService);
  private userState = inject(UseStateService);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      username: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const datos: LoginForm = this.form.value as LoginForm;
      console.log("Datos enviados:", datos);

      this.loginService.login(datos).subscribe({
        next: (res) => {
          console.log("Login exitoso:", res.user);
          this.authService.login(res.user.roles);
          this.form.reset();
          this.userState.setUser(res.user);
          this.router.navigate(["/task"]);
        },
        error: (err) => {
          console.error("Error en login:", err);
        },
      });
    } else {
      console.log("Formulario inválido");
    }
  }


}
