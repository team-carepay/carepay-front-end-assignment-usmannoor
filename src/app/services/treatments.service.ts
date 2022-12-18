import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Treatment } from '../treatments/treatment.interface';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  treatmentsUrl = `https://my-json-server.typicode.com/team-carepay/carepay-front-end-assignment-usmannoor/treatments`;

  constructor(private http: HttpClient) {}

  getTreatments(): Promise<Treatment[]> {
    return this.http.get<Treatment[]>(this.treatmentsUrl).toPromise();
  }

  searchPattern(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const searchValue = control.value;
      if (!searchValue) {
        return { searchValueError: false };
      }
      let searchObj = {};

      for (let i = 0; i < searchValue.length; i++) {
        const value = searchValue[i];
        searchObj[value] = searchObj[value] + 1 || 1;
        if (searchObj[value] >= 3) {
          return null;
        }
      }
      return { searchValueError: false };
    };
  }
}
