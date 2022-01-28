import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirVendasComponent } from './exibir-vendas.component';

describe('ExibirVendasComponent', () => {
  let component: ExibirVendasComponent;
  let fixture: ComponentFixture<ExibirVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExibirVendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
