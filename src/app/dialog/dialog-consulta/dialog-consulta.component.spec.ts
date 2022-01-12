import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultaComponent } from './dialog-consulta.component';

describe('DialogConsultaComponent', () => {
  let component: DialogConsultaComponent;
  let fixture: ComponentFixture<DialogConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
