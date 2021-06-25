import { EventEmitter } from "@angular/core";
import {Component, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'srv-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss']
})

export class BaseDialogComponent implements OnInit{
  @Input()
  dialogTypeFlag:string =''
  @Input()
  showDialog: boolean | undefined
  @Input()
  profile
  constructor() {
  }
  ngOnInit() {
  }

  @Output() hideDialog = new EventEmitter<boolean>();
  changeDisplay():void{
    this.showDialog = false
    this.hideDialog.emit(false)
  }

}
