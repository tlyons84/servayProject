import {Injectable} from "@angular/core";
import {mockapiService, OBJECT_STORE} from "./mockapi.service";

@Injectable({
  providedIn: 'root'
})
export class questionnaireFetchService {
constructor(private mockapi:mockapiService) {
}

getAservay(key:string){
  return this.mockapi.get(OBJECT_STORE.SERVAY, key)
}
 async getAllServays():Promise<any>{
  return await this.mockapi.getAll(OBJECT_STORE.SERVAY)
}

getServayIds(){
 return this.mockapi.getAllKeys(OBJECT_STORE.SERVAY)
}
getServayCount(){
 return this.mockapi.getCount(OBJECT_STORE.SERVAY)
}

}
