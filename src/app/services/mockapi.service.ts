import {EventEmitter, Injectable} from "@angular/core";
import { IDBPDatabase, openDB } from 'idb';
import {HttpClient} from "@angular/common/http";
const SERVAY_DB_NAME:string = 'survayDB'
export enum Mode {
  ReadWrite = 'readwrite',
  ReadOnly = 'readonly'
}
@Injectable({
    providedIn: 'root'
  })

export class mockapiService {
  private servayDB:IDBPDatabase
  constructor() {
  }

  async connect(): Promise<void>{
    this.servayDB = await openDB(SERVAY_DB_NAME,17,{
      upgrade(db: IDBPDatabase<unknown>) {
        if (!db.objectStoreNames.contains(OBJECT_STORE.SERVAY)) {
          db.createObjectStore(OBJECT_STORE.SERVAY, {
            keyPath: 'servayId'
          });

        }
        if (!db.objectStoreNames.contains(OBJECT_STORE.ANSWER)) {
          db.createObjectStore(OBJECT_STORE.ANSWER, {
            keyPath: 'userId'
          });

        }
        if (!db.objectStoreNames.contains(OBJECT_STORE.PROFILE)) {
          let objectStore = db.createObjectStore(
            OBJECT_STORE.PROFILE,
            {
              keyPath: 'userId'
            }
          );


        }
      }
    })
  }
  async getAllKeys(store: OBJECT_STORE): Promise<any> {
    const db = this.servayDB.transaction(store, 'readonly');
    const objectStore = db.objectStore(store);
    return await objectStore.getAllKeys();
  }

  async getAll(store: OBJECT_STORE) {
    const db = this.servayDB.transaction(store, 'readonly');
    const objectStore = db.objectStore(store);
    const result = objectStore.getAll();
    return result;
  }

  open() {
    const requestToOpen = indexedDB.open('survayDB');
    return requestToOpen;
  }
  doPut(store: OBJECT_STORE,  key:string, objectToStore:any) {
    let keypath = this.findWhichKey(store)
    const requestToOpen = this.open();
    requestToOpen.onsuccess = () => {
      const db = requestToOpen.result;
      const objectStore = db
        .transaction([store], 'readwrite')
        .objectStore(store);

      const objectStoreUpdate = objectStore.put(
        {
        [keypath]: key,
          value:objectToStore
        },

      );

    };
  }

  remove(store: OBJECT_STORE, key: string): void {
    const transaction = this.servayDB.transaction(store, 'readwrite');
    const objectStore = transaction.objectStore(store);
    objectStore.delete(key);
    try {
      objectStore.delete(key.concat('-filter'));
    } catch (e) {}
  }

  getCount(store: OBJECT_STORE): Promise<any> {
    const db = this.servayDB;
    const transaction = db.transaction(store, Mode.ReadOnly);
    const storage = transaction.objectStore(store);
    return storage.count();
  }
  async get(store: OBJECT_STORE, key: string): Promise<any> {
    const transaction = this.servayDB.transaction([store], 'readwrite');
    const objectStore = await transaction.objectStore(store);
    transaction.oncomplete = function(event) {
      return transaction.done;
    };
    transaction.onerror = function(event) {
      console.error(`${key} : [Transaction] GET FAILED!`);
      console.error(event);
      transaction.done;
    };
    const existingValue = await objectStore.get(key);


      return existingValue;
    }
    findWhichKey(store:OBJECT_STORE):string{
      let keypath:string = ''
      if(store == OBJECT_STORE.SERVAY){
        keypath = "servayId"
      }else{
        keypath = "userId"
      }
      return keypath
    }

}
export enum OBJECT_STORE {
  'ANSWER'='ANSWER',
  'SERVAY' = 'servays',
  'PROFILE' = 'profiles',

}
