import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListApprovedShiftsPage } from './list-approved-shifts.page';

describe('ListApprovedShiftsPage', () => {
  let component: ListApprovedShiftsPage;
  let fixture: ComponentFixture<ListApprovedShiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApprovedShiftsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListApprovedShiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
