import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendarPage} from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarPage;
  let fixture: ComponentFixture<CalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
