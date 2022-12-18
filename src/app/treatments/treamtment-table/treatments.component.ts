import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Treatment } from '../treatment.interface';
import { HttpClient } from '@angular/common/http';
import { TreatmentsService } from '../../services/treatments.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss'],
  providers: [DatePipe],
})
export class TreatmentsComponent implements OnInit {
  treatments: Treatment[] = [];
  filterForm: FormGroup;
  placeholders = new Array(5);
  loading = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private treatmentService: TreatmentsService
  ) {}

  async ngOnInit() {
    this.initializeForm();
    await this.fetchTreatments();
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      search: new FormControl(null, [this.treatmentService.searchPattern()]),
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(async value => {
        if (
          this.filterForm.controls['search'].valid ||
          !this.filterForm.controls['search'].value
        ) {
          await this.fetchTreatments(value.search.toUpperCase());
        }
      });
  }

  async fetchTreatments(param = '') {
    this.loading = true;
    if (!param) {
      this.treatments = await this.treatmentService.getTreatments();
    } else {
      this.treatments = this.treatments.filter(treatment =>
        treatment.treatmentCode.toUpperCase().includes(param)
      );
    }
    this.loading = false;
  }

  trackByFn(index: number, item: { treatmentCode: string }): string {
    return item.treatmentCode;
  }

  placeHolderTrackByFn(index: number): number {
    return index;
  }
}
