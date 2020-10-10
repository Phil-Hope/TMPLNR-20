import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListApprovedSecondaryShiftsPage } from './list-approved-secondary-shifts.page';

describe('ListApprovedSecondaryShiftsPage', () => {
  let component: ListApprovedSecondaryShiftsPage;
  let fixture: ComponentFixture<ListApprovedSecondaryShiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApprovedSecondaryShiftsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListApprovedSecondaryShiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
