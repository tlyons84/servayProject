import {Component, Input, OnInit} from "@angular/core";
import {profile} from '../../interfaces/profile.interface'
import {MenuItem} from "primeng/api";
import {ProfileFetchService} from "../../services/profile-fetch.service";
import {ProfileGeneratorService} from "../../services/profile-generator.service";
@Component({
  selector: 'srv-landingpage',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class landingPageComponent implements OnInit{
  //profile Obj

  profile:profile
  options: MenuItem[] =[]
  display:boolean =false
  actionFlag:string='';
  constructor(private profileFetch:ProfileFetchService, private profileGenerator:ProfileGeneratorService) {
  }

  ngOnInit() {
    this.createDefaultProfile();
    let role:string ='admin'
    if(role=="admin") {
      this.adminOptionsBuilder()
    }else{
      this.userOptionsBuilder()
    }
  }
async  createDefaultProfile(){
    let profileCount:number = 0
    let testProfile:profile;
  await  this.profileFetch.getprofileCount().then(resp => { profileCount = resp})
  if(profileCount <1){
    testProfile = {
      role:'admin',
      name:"sam",
      userName:'sam@gmail.com',
      email:'sam@gmail.com',
      phoneNumber:2016059737
    }
    this.profile = testProfile
    this.profileGenerator.insertUser(this.profile)
  }else{
    let newProfileKey;

    await this.profileFetch.getAllprofiles().then( resp => {this.profile = resp[0].value})
    console.log(this.profile)
  }

  }

  adminOptionsBuilder():void{
    this.options =[
      {
        label:"Create",
        items:[
          {
            label:"Create a profile",
            command: event => {this.showDialog("profile")}
          },
          {
            label:"Create a questionnaire",
            command: event => {this.showDialog("questionnaireGenerator")}
          },

        ]
      },
      {
      label:"Take a Survay",
      command:event => {this.showDialog("questionnaire")}
  }
    ]
  }
  showDialog(type:string):void{

    this.display = true
    this.actionFlag =type;
  }
  userOptionsBuilder():void{
    this.options =[
      {
        label:"Take a Survay",
        command:event => {this.showDialog("questionnaire")}
      }
    ]
  }
  changeDisplay(displayFlag:boolean):void{
    this.display = displayFlag;
  }
}
