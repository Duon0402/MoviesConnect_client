import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenresCreateOrEditComponent } from './admin-genres-create-or-edit.component';

describe('AdminGenresCreateOrEditComponent', () => {
  let component: AdminGenresCreateOrEditComponent;
  let fixture: ComponentFixture<AdminGenresCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGenresCreateOrEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGenresCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
