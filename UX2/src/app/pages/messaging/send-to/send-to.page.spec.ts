import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendToPage } from './send-to.page';

describe('SendToPage', () => {
  let component: SendToPage;
  let fixture: ComponentFixture<SendToPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendToPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
