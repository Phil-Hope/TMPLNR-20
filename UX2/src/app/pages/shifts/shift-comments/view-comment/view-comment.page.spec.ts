import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCommentPage } from './view-comment.page';

describe('ViewCommentPage', () => {
  let component: ViewCommentPage;
  let fixture: ComponentFixture<ViewCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
