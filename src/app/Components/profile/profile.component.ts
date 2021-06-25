import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {profile} from "../../interfaces/profile.interface";
import {ConfirmationService} from "primeng/api";
import {ProfileGeneratorService} from "../../services/profile-generator.service";

@Component({
  selector: 'srv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class profileComponent implements OnInit {
  roleType: string = '';
  @Output()
  displaySwitch  =new EventEmitter<boolean>();
  userForm = new FormGroup({
    role: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.email,Validators.required]),
    phoneNumber: new FormControl('',Validators.required)
  })
  newUser: profile;

  constructor(private confirmationService: ConfirmationService, private userService:ProfileGeneratorService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if(!this.userForm.valid){
      alert("Please fill all fields");
    }else {
      this.createUserProfile();
      this.displaySwitch.emit(false)
    }
  }
  onClose():void{
    if(!this.userForm.dirty) {
      this.userForm.reset()
      this.displaySwitch.emit(false)
    }else {
      this.confirmationService.confirm({
        key: 'meConfirm',
        message:
          'You have unsaved changes. Do you really want to cancel?',
        accept: () => {
          this.userForm.reset()
          this.displaySwitch.emit(false)
        }
      });
    }

  }


  createUserProfile():void{
    let phoneNumber:number = 0
    if(this.userForm.get("phoneNumber").value.toString().indexOf("-")>-1){
      let replacement:string = this.userForm.get("phoneNumber").value.toString().replaceAll(/[^\w]/gi, '',"");
      phoneNumber = Number(replacement);

    }else{
    phoneNumber =  Number( this.userForm.get("phoneNumber").value.toString())
    }
    this.newUser = {
      role: this.userForm.get("role").value.toString(),
      name: this.userForm.get("name").value.toString(),
      userName: this.userForm.get("email").value.toString(),
      email:this.userForm.get("email").value.toString(),
      phoneNumber: phoneNumber
    }
    this.userService.insertUser(this.newUser);
  }

}
