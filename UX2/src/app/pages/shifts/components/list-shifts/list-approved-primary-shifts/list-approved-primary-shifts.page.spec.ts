import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListApprovedPrimaryShiftsPage } from './list-approved-primary-shifts.page';

describe('ListApprovedPrimaryShiftsPage', () => {
  let component: ListApprovedPrimaryShiftsPage;
  let fixture: ComponentFixture<ListApprovedPrimaryShiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApprovedPrimaryShiftsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListApprovedPrimaryShiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
