import {Injectable} from "@angular/core";
import {mockapiService, OBJECT_STORE} from "./mockapi.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileFetchService {
  constructor(private mockapi: mockapiService) {
  }

  async getAprofile(key: string) {
    return await this.mockapi.get(OBJECT_STORE.PROFILE, key)
  }

  async getAllprofiles() {
    return await this.mockapi.getAll(OBJECT_STORE.PROFILE)
  }

  async getprofieIds() {
    return await this.mockapi.getAllKeys(OBJECT_STORE.PROFILE)
  }

  async getprofileCount() {
    return await this.mockapi.getCount(OBJECT_STORE.PROFILE)

  }
}
