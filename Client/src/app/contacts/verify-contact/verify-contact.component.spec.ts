import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyContactComponent } from './verify-contact.component';

describe('VerifyContactComponent', () => {
  let component: VerifyContactComponent;
  let fixture: ComponentFixture<VerifyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
