import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { ParameterizedMovie } from './parameterized-movie';

describe('ParameterizedMovie', () => {
  let component: ParameterizedMovie;
  let fixture: ComponentFixture<ParameterizedMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterizedMovie, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterizedMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
