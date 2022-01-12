import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditarComponent } from './item-editar.component';

describe('ItemEditarComponent', () => {
  let component: ItemEditarComponent;
  let fixture: ComponentFixture<ItemEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
