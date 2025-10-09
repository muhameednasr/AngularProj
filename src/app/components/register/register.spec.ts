import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { Register } from './register';
import { UserService } from '../../auth/user-service';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Register, FormsModule, RouterTestingModule],
      providers: [UserService],
    });

    // ensure the standalone component's own injector includes FormsModule during tests
    TestBed.overrideComponent(Register, {
      set: { imports: [FormsModule, CommonModule, RouterTestingModule] },
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
