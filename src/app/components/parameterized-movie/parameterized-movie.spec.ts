import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterizedMovie } from './parameterized-movie';

describe('ParameterizedMovie', () => {
  let component: ParameterizedMovie;
  let fixture: ComponentFixture<ParameterizedMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterizedMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterizedMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
