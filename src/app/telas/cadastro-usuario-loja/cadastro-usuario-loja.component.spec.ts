import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUsuarioLojaComponent } from './cadastro-usuario-loja.component';

describe('CadastroUsuarioLojaComponent', () => {
  let component: CadastroUsuarioLojaComponent;
  let fixture: ComponentFixture<CadastroUsuarioLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroUsuarioLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroUsuarioLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
