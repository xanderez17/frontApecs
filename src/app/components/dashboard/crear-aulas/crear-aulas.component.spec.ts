import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAulasComponent } from './crear-aulas.component';

describe('CrearAulasComponent', () => {
  let component: CrearAulasComponent;
  let fixture: ComponentFixture<CrearAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
