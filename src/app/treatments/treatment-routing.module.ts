import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TreatmentsComponent } from './treamtment-table/treatments.component';

const routes: Routes = [
  {
    path: '',
    component: TreatmentsComponent,
    data: { title: 'Treatments' },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentRoutingModule {}
