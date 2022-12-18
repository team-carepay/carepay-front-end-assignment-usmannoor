import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TreatmentsService } from './treatments.service';

const mockTreatments = [
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

describe('TreatmentsService', () => {
  let service: TreatmentsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TreatmentsService],
    }).compileComponents();
    service = TestBed.inject(TreatmentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hit endpoint to get treatments data', async () => {
    // !! get a handle on the promise
    const promise = service.getTreatments();
    // !! get a handle on the http request in flight
    const req = httpMock.expectOne(request => request.method === 'GET');
    // !! send this response to the http call
    req.flush(mockTreatments);
    // !! await the promise
    const result = await promise;
    // !! expect the result to be what we sent
    expect(result).toEqual(mockTreatments);
  });
});
