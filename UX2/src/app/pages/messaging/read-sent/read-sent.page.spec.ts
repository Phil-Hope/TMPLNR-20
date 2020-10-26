import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadSentPage } from './read-sent.page';

describe('ReadSentPage', () => {
  let component: ReadSentPage;
  let fixture: ComponentFixture<ReadSentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadSentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
