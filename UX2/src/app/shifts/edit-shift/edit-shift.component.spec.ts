import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditShiftComponent } from './edit-shift.component';

describe('EditShiftComponent', () => {
  let component: EditShiftComponent;
  let fixture: ComponentFixture<EditShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShiftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
