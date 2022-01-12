import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupomComponent } from './cupom.component';

describe('CupomComponent', () => {
  let component: CupomComponent;
  let fixture: ComponentFixture<CupomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
