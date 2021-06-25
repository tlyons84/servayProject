import {mockapiService, OBJECT_STORE} from "./mockapi.service";
import {answer} from "../interfaces/answer.interface";
import {Injectable} from "@angular/core";
@Injectable()
export class answerPushService {
constructor(private mockapiService: mockapiService) {
}
async insertAnswer(answerObject:answer[]){
  let key: string =''
  if(answerObject.length>1) {
   key = answerObject[0].userId
  }
  this.mockapiService.doPut(OBJECT_STORE.ANSWER, key,answerObject )
}
removeAnswer(key:string){
  this.mockapiService.remove(OBJECT_STORE.ANSWER,key)
}

updateANSWER(){}

}
