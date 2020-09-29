import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListShiftsComponent } from './list-shifts.component';

describe('ListShiftsComponent', () => {
  let component: ListShiftsComponent;
  let fixture: ComponentFixture<ListShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListShiftsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
