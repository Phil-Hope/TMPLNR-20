import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContainerPage } from './shifts-container.page';

describe('ContainerPage', () => {
  let component: ContainerPage;
  let fixture: ComponentFixture<ContainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
