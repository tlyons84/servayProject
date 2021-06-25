import {questionnaireInterface} from './questionnaire.interface'
export interface profile{
  role:string;
  name:string;
  userName:string;
  email:string;
  phoneNumber:number;
  //questionnaire Object
  questionnaireAnswered?:questionnaireInterface[]
  groupid?:number
 //attachMenu interface
}
