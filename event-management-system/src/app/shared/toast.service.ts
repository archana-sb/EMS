import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable()

export class ToastService{
    constructor(private readonly snackBar: MatSnackBar,){

    }
    showSuccessMessage(message: string): void {
        this.snackBar.open(message, 'OK', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      }
    
      showErrorMessage(message: string): void {
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
}