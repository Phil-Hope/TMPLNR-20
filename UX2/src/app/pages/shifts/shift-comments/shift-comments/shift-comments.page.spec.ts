import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShiftCommentsPage } from './shift-comments.page';

describe('ShiftCommentsPage', () => {
  let component: ShiftCommentsPage;
  let fixture: ComponentFixture<ShiftCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
