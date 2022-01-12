import { ComponentFixture, TestBed } from '@angular/core/testing';

import { novaVendaComponent } from './nova-venda.component';

describe('novaVendaComponent', () => {
  let component: novaVendaComponent;
  let fixture: ComponentFixture<novaVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ novaVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(novaVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
