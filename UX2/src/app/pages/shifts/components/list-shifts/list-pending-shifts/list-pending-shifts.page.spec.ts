import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPendingShiftsPage } from './list-pending-shifts.page';

describe('ListPendingShiftsPage', () => {
  let component: ListPendingShiftsPage;
  let fixture: ComponentFixture<ListPendingShiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPendingShiftsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPendingShiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
