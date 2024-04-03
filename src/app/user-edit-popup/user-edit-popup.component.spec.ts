import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditPopupComponent } from './user-edit-popup.component';

describe('UserEditPopupComponent', () => {
  let component: UserEditPopupComponent;
  let fixture: ComponentFixture<UserEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
