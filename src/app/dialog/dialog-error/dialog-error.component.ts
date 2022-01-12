import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    this.data = this.data !== '' && this.data !== undefined ? this.data : 'Ocorreu um erro, tente novamente';
  }

}
