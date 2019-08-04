import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetornoPagamentoComponent } from './retorno-pagamento.component';

describe('RetornoPagamentoComponent', () => {
  let component: RetornoPagamentoComponent;
  let fixture: ComponentFixture<RetornoPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetornoPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetornoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
