import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddShiftComponent } from './add-shift.component';

describe('AddShiftComponent', () => {
  let component: AddShiftComponent;
  let fixture: ComponentFixture<AddShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShiftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
