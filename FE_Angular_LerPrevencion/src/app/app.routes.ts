import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
    { path: 'user', component: UserFormComponent },
    { path: '**', redirectTo: '/user', pathMatch: 'full' },
];