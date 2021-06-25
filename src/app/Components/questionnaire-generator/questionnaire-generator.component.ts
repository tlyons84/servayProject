import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {questionnaireInterface} from "../../interfaces/questionnaire.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService} from "primeng/api";
import {questionnaireFetchService} from "../../services/questionnaire-fetch.service";
import {questionnaireGeneratorService} from "../../services/questionnaire-generator.service";
interface questionType{
  name:string,
  type:string
}
@Component({
  selector: 'srv-questionnaire-generator',
  templateUrl: './questionnaire-generator.component.html',
  styleUrls: ['./questionnaire-generator.component.scss']
})


export class  questionnaireGeneratorComponent implements OnInit{
questionType: questionType[]
  selectedType:questionType
  servay: questionnaireInterface[] =[];
  mandatory: boolean;
  @Output()
  displaySwitch  =new EventEmitter<boolean>();

  servayForm = new FormGroup({
    mandatory: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    answers: new FormControl('',),
    type: new FormControl('',Validators.required),
    groupId: new FormControl('',)
  })
  constructor(private confirmationService: ConfirmationService, private  survayGen: questionnaireGeneratorService) {
    this.questionType = [ {name: 'True or False', type: 'radioButton'},
      {name: 'opinion', type: 'input'}]
  }
  ngOnInit() {
  }
  setEnable():boolean{
    if(this.selectedType !=undefined) {
      return this.selectedType.type == 'multiSelect';
    }else{
      return false
    }
  }

  onSubmit(){

if(this.servay.length <1) {
  this.servay = [this.questionCreatior(1)]
}else{
  this.servay.push(this.questionCreatior(this.servay.length +1))
}
    this.confirmationService.confirm({
      key: 'meConfirm',
      message:
        'would you like to add another question?',
      accept: () => {
        this.servayForm.reset()

      },

      reject:() => {
        this.survayGen.insertServay(this.servay)
        this.servayForm.reset()
        this.displaySwitch.emit(false)

      }
    });
  }
    questionCreatior(value:number):questionnaireInterface{
      let answerArry:string[] =[]
      let answers = this.servayForm.get("answers").value
      if(answers !=null &&answers.toString().indexOf(",")>-1){
        answerArry = answers.toString().split(",")
      }
    let question:questionnaireInterface =
      {
        servayId: value,
        questioinName: this.servayForm.get("name").value.toString(),
        mandatory: Boolean(this.servayForm.get("mandatory").value),
        answers: answerArry,
        questionType: this.selectedType.type
      }
      return question
    }

  onClose(){
    if(!this.servayForm.dirty) {
      this.servayForm.reset()
      this.displaySwitch.emit(false)
    }else {
      this.confirmationService.confirm({
        key: 'meConfirm',
        message:
          'You have unsaved changes. Do you really want to cancel?',
        accept: () => {
          this.servayForm.reset()
          this.displaySwitch.emit(false)
        }
      });
    }
  }

}
