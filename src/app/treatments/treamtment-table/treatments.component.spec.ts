import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TreatmentsComponent } from './treatments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TreatmentsService } from '../../services/treatments.service';
import { Treatment } from '../treatment.interface';
const mockTreatments: Treatment[] = [
  {
    treatmentCode: 'AAA131',
    patient: 'Lakshmi Sonja',
    treatmentDate: '2021-08-31T07:19:53',
  },
  {
    treatmentCode: 'AA13134BA',
    patient: 'Judith Militsa',
    treatmentDate: '2021-08-05T15:19:53',
  },
];

describe('TreatmentsComponent', () => {
  let component: TreatmentsComponent;
  let fixture: ComponentFixture<TreatmentsComponent>;
  let treatmentService: TreatmentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreatmentsComponent],
      providers: [FormBuilder, TreatmentsService],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    treatmentService = TestBed.inject(TreatmentsService);
    fixture = TestBed.createComponent(TreatmentsComponent);
    component = fixture.componentInstance;
    component.treatments = mockTreatments;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check form validity', () => {
    expect(component.filterForm.valid).toBeFalsy();

    const {search: searchInput} = component.filterForm.controls;
    searchInput.setValue('AA12ZC');
    expect(component.filterForm.valid).toBeFalsy();
    expect(searchInput.errors).toBeTruthy();

    searchInput.setValue('AAA12ZC');
    expect(component.filterForm.valid).toBeTruthy();
    expect(searchInput.errors).toBeNull();
  });

  it('should populate treatment', fakeAsync(() => {
    spyOn(treatmentService, 'getTreatments').and.callThrough();

    component.fetchTreatments();
    tick(500);

    expect(component.treatments.length).toBeGreaterThan(0);
    expect(component.loading).toBeTruthy();
    expect(treatmentService.getTreatments).toHaveBeenCalled();
  }));
});
