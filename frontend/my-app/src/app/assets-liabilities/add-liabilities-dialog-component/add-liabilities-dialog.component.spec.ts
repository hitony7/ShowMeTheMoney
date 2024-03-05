import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLiabilitiesDialogComponent } from './add-liabilities-dialog.component';

describe('AddIncomeDialogComponentComponent', () => {
  let component: AddLiabilitiesDialogComponent;
  let fixture: ComponentFixture<AddLiabilitiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLiabilitiesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLiabilitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
