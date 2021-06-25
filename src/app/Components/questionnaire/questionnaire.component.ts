import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {questionnaireInterface} from "../../interfaces/questionnaire.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {questionnaireFetchService} from "../../services/questionnaire-fetch.service";
import {ConfirmationService} from "primeng/api";
import {profile} from "../../interfaces/profile.interface";
import {answer, userAnswer} from "../../interfaces/answer.interface";
import {answerPushService} from "../../services/answer-push.service";
interface servay{
  name:number,
  value:number
}

@Component({
  selector: 'srv-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})

export class questionnaireComponent implements OnInit{
  @Output()
  displaySwitch  =new EventEmitter<boolean>();
  @Input()
  profile:profile;
  finalAnswer:answer[] =[]
  userAnswer:string=''
  servay: questionnaireInterface[]=[];
  hideMe:boolean = false
  type:string ="";
  servaySelection: servay[] =[]
  selectedServay:servay
  allservays:any[] =[]
  radio:boolean

  answerForm : FormGroup = new FormGroup({})
  constructor(private servayFetchService: questionnaireFetchService,private confirmationService: ConfirmationService, private answerService: answerPushService) {

  }
ngOnInit() {
 this.buildServayIds()
}
async buildServayIds(){
  await this.servayFetchService.getAllServays().then(  resp=> {
    console.log(resp)
    this.allservays  = resp
    this.allservays.forEach(x=> {
      this.servaySelection.push({
        name:Number(x.servayId),
        value:Number(x.servayId)
      })
    })
  }).finally()
}
  populateServay(event:any){
    this.allservays.forEach(x=>{
      if(x.servayId == event.value){
        this.servay = x.value
      }
    })
    this.generateDynamicForm();
    this.hideMe=true;
  }
  generateDynamicForm(){
    let generatedFormGroup = new FormGroup({})
    this.servay.forEach(x =>{
      if(x.mandatory==false) {
        generatedFormGroup.addControl(x.questioinName, new FormControl(''))
      }else{
        generatedFormGroup.addControl(x.questioinName, new FormControl('',Validators.required))

      }
    })
    this.answerForm = generatedFormGroup;
  }
  onSubmit(){
    console.log(this.radio)
    this.confirmationService.confirm({
      key: 'meConfirm',
      message:
        'would you like to answer another servay?',
      accept: () => {
       this.hideMe = false;
       this.answerForm.reset();
      this.createAnswer();
      },

      reject:() => {
        this.createAnswer()
        this.answerService.insertAnswer(this.finalAnswer);
        this.onClose()
      }
    });
  }
  createAnswer():void{
    let answerArray: userAnswer[] = []
    Object.keys(this.answerForm.controls).forEach(key =>{
      answerArray.push({questionName:key, answer:this.answerForm.get(key).value.toString()})
    })
    console.log(answerArray)
    let answer:answer={
      userId: this.profile.email.toString(),
      useranswer:answerArray,
      servayId:this.selectedServay.value
    }
    this.finalAnswer.push(answer)
  }
  onClose(){
    this.displaySwitch.emit(false)
  }
}
