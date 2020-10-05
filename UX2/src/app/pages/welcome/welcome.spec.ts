import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { MenuController } from '@ionic/angular';

import { WelcomePage} from "./welcome";

import { IonicStorageModule } from '@ionic/storage';
describe('WelcomePage', () => {
  // tslint:disable-next-line:one-variable-per-declaration
  let fixture, app;
  beforeEach(async(() => {
    const menuSpy = jasmine.createSpyObj('MenuController', [
      'toggle',
      'enable'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [WelcomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicStorageModule.forRoot()],
      providers: [
        { provide: MenuController, useValue: menuSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePage);
    app = fixture.debugElement.componentInstance;
  });
  it('should create the welcome page', () => {
    expect(app).toBeTruthy();
  });

  it('should check the welcome status', async () => {
    const didTuts = await app.storage.get('ion_did_welcome');
    expect(didTuts).toBeFalsy();
  });
});
