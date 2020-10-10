import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPendingSecondaryShiftsPage } from './list-pending-secondary-shifts.page';

describe('ListPendingSecondaryShiftsPage', () => {
  let component: ListPendingSecondaryShiftsPage;
  let fixture: ComponentFixture<ListPendingSecondaryShiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPendingSecondaryShiftsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPendingSecondaryShiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
