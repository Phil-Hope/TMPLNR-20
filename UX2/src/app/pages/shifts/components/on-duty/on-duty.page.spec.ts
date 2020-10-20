import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnDutyPage } from './on-duty.page';

describe('OnDutyPage', () => {
  let component: OnDutyPage;
  let fixture: ComponentFixture<OnDutyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDutyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnDutyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
