import { Component, inject, OnInit } from "@angular/core";
import { NewUser } from "./interface";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from "../../services/userService/user-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create",
  imports: [ReactiveFormsModule],
  templateUrl: "./create.html",
  styleUrl: "./create.scss",
})
export class Create implements OnInit {
  form!: FormGroup;

  userService = inject(UserService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      username: ["", [Validators.required, Validators.minLength(4)]],
      roles: [["USER"], [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const datos: NewUser = this.form.value as NewUser;
      console.log("Datos enviados:", datos);

      this.userService.createAccount(datos).subscribe({
        next: (res) => {
          console.log("Creacion de usuario exitosa:", res);

          this.form.reset();

          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.error("Error en crear Usuario:", err);
        },
      });
    } else {
      console.log("Formulario inválido");
    }
  }
}
