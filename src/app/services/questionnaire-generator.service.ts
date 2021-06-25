import {Injectable} from "@angular/core";
import {mockapiService, OBJECT_STORE} from "./mockapi.service";
import {questionnaireInterface} from "../interfaces/questionnaire.interface";
import {questionnaireFetchService} from "./questionnaire-fetch.service";

@Injectable({
  providedIn: 'root'
})
export class questionnaireGeneratorService {
constructor(private mockapiService: mockapiService, private fetchSurvay:questionnaireFetchService) {
}
 async insertServay(servayObject:questionnaireInterface[]){
  let key:string = ''
  await this.fetchSurvay.getServayCount().then(resp =>{
    key = String(resp+1)
  })
    this.mockapiService.doPut(OBJECT_STORE.SERVAY, key,servayObject )
  }
  removeServay(key:string){
  this.mockapiService.remove(OBJECT_STORE.SERVAY,key)
  }

  updateServay(){}

}
