import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { Routes, RouterModule } from '@angular/router';
import { MyPageComponent } from './my-page.component';
import { MyThreeComponent } from './history/my-three/my-three.component';
import { MyTwoComponent } from './history/my-two/my-two.component';
import { LoginGuard } from 'src/app/core/guard/login/login.guard';
import { GradeComponent } from './grade/grade.component';

const routes: Routes = [
  {
    path: '',
    component: MyPageComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'history/three', pathMatch: 'full' },
      {
        path: 'history',
        children: [
          // tslint:disable-next-line: max-line-length
          { path: 'three', loadChildren: () => import('./history/my-three/my-three.module').then((m) => m.MyThreeModule), canActivate: [LoginGuard] },
          // tslint:disable-next-line: max-line-length
          { path: 'two', loadChildren: () => import('./history/my-two/my-two.module').then((m) => m.MyTwoModule), canActivate: [LoginGuard] },
        ],
      },
      { path: 'grade', loadChildren: () => import('./grade/grade.module').then((m) => m.GradeModule), canActivate: [LoginGuard] },
      { path: 'mileage', loadChildren: () => import('./mileage/mileage.module').then((m) => m.MileageModule), canActivate: [LoginGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageRoutingModule { }
