import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TreatmentsComponent } from './treatments/treamtment-table/treatments.component';

describe('AppComponent', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'treatments', component: TreatmentsComponent },
        ]),
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    router = TestBed.get(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render treatments component', fakeAsync(() => {
    router.navigate(['/treatments']);
    tick();
    expect(router.url).toBe('/treatments');
  }));
});
