import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCertificationsCreateOrEditComponent } from './admin-certifications-create-or-edit.component';

describe('AdminCertificationsCreateOrEditComponent', () => {
  let component: AdminCertificationsCreateOrEditComponent;
  let fixture: ComponentFixture<AdminCertificationsCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCertificationsCreateOrEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCertificationsCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
