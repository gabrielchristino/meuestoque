import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQrcodeComponent } from './dialog-qrcode.component';

describe('DialogQrcodeComponent', () => {
  let component: DialogQrcodeComponent;
  let fixture: ComponentFixture<DialogQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQrcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
