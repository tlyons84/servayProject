import {Injectable} from "@angular/core";
import {profile} from "../interfaces/profile.interface";
import {questionnaireInterface} from "../interfaces/questionnaire.interface";
import {mockapiService, OBJECT_STORE} from "./mockapi.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileGeneratorService {

  constructor(private mockapiService: mockapiService) {
  }
  insertUser(profileObject:profile){
    let key:string = profileObject.userName
    this.mockapiService.doPut(OBJECT_STORE.PROFILE, key,profileObject )
  }
  removeUser(key:string){
    this.mockapiService.remove(OBJECT_STORE.PROFILE,key)

  }

  updateUser(){}


}
