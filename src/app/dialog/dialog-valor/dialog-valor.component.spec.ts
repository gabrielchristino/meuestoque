import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogValorComponent } from './dialog-valor.component';

describe('DialogValorComponent', () => {
  let component: DialogValorComponent;
  let fixture: ComponentFixture<DialogValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
