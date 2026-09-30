import { Component, inject, OnInit } from "@angular/core";
import { UseStateService } from "../../services/stateService/use-state-service";
import { TaskService } from "../../services/taskService/task-service";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { TaskParams } from "./interfaceTask";

@Component({
  selector: "app-task",
  imports: [ReactiveFormsModule],
  templateUrl: "./task.html",
  styleUrl: "./task.scss",
})
export class Task implements OnInit {
  form!: FormGroup;

  userState = inject(UseStateService);
  taskService = inject(TaskService);

  showAdd: boolean = false;

  tasksList: TaskParams[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      status: ["", [Validators.required, Validators.minLength(6)]],
    });

    console.log("iniciando el componente");
    this.getTask();
  }

  getTask() {
    const user = this.userState.user();

    this.taskService.getTasks(user.id).subscribe({
      next: (res) => {
        console.log("tasks", res);

       this.tasksList = res.map((t: TaskParams) => {
         console.log(t);
         return {
           id: t.id,
           name: t.name,
           status: t.status,
         };
       });

       console.log(this.tasksList);

      },
      error: (err) => {
        console.error("Error al obtener tasks:", err);
      },
    });
  }

  agregarTask() {
    this.showAdd = !this.showAdd;
  }

  onSubmit() {
    if (this.form.valid) {
      const datos: TaskParams = this.form.value as TaskParams;
      console.log("Datos enviados:", datos);
      this.taskService.saveTask(datos).subscribe({
        next: (res) => {
          console.log("Creacion de task exitosa:", res);



          this.form.reset();
        },
        error: (err) => {
          console.error("Error en crear task:", err);
        },
      });
    } else {
      console.log("Formulario inválido");
    }
  }
}
