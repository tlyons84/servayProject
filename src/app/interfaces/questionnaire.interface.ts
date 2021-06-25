export interface questionnaireInterface{
  servayId:number
  questioinName:string
  mandatory:boolean;
  answers?:string[]
  questionType:string;
  groupid?:number;
}
