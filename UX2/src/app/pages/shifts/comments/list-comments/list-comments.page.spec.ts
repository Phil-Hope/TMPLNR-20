import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCommentsPage } from './list-comments.page';

describe('ListCommentsPage', () => {
  let component: ListCommentsPage;
  let fixture: ComponentFixture<ListCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
