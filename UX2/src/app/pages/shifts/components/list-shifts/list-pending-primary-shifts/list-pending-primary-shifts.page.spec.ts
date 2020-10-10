import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPendingPrimaryShiftsPage } from './list-pending-primary-shifts.page';

describe('ListPendingPrimaryShiftsPage', () => {
  let component: ListPendingPrimaryShiftsPage;
  let fixture: ComponentFixture<ListPendingPrimaryShiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPendingPrimaryShiftsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPendingPrimaryShiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
