import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'srv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class loginComponent implements OnInit{
  ngOnInit() {
    console.log("I hit login")
  }
}
