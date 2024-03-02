import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private dialogRef: MatDialogRef<MenuComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
