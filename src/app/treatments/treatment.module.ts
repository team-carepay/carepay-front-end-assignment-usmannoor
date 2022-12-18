import { TreatmentsService } from '../services/treatments.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TreatmentsComponent } from './treamtment-table/treatments.component';
import { NgModule } from '@angular/core';
import { TreatmentRoutingModule } from './treatment-routing.module';

@NgModule({
  declarations: [TreatmentsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TreatmentRoutingModule,
  ],
  providers: [TreatmentsService],
})
export class TreatmentModule {}
