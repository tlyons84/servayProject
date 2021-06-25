import {Injectable} from "@angular/core";
import {mockapiService, OBJECT_STORE} from "./mockapi.service";

@Injectable({
  providedIn: 'root'
})
export class AnswerFetchService {
  constructor(private mockapi: mockapiService) {
  }

  getAAnswer(key: string) {
    return this.mockapi.get(OBJECT_STORE.ANSWER, key)
  }

  getAllAnswers() {
    return this.mockapi.getAll(OBJECT_STORE.ANSWER)
  }

  getanswerIds() {
    return this.mockapi.getAllKeys(OBJECT_STORE.ANSWER)
  }

  getANSWERCount() {
    return this.mockapi.getCount(OBJECT_STORE.ANSWER)

  }
}
