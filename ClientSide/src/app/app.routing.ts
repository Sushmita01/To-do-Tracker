import { Routes, RouterModule } from "@angular/router";
import { ToDoComponent } from "./to-do/to-do.component";
import { ModuleWithProviders } from "@angular/compiler/src/core";

const routes: Routes = [
{path: '', component: ToDoComponent},
{path: '**', component: ToDoComponent} ];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);