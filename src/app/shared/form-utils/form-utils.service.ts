import { Injectable } from '@angular/core';

@Injectable()
export class FormUtilsService {

  constructor() { }

  // idToName(key, id?, types?) {
  //   id = id ? id : this.vehicle[key];
  //   types = types ? types : this.types[`${key}s`];
  //   if (!id) {return ''; } // if id is an empty string
  //   let matchObj;
  //   if (types[0].id) {
  //     matchObj = types.find(i => i.id === id);
  //   } else {
  //     matchObj = types.find(i => i._id === id);
  //   }
  //   if (!matchObj) {throw new Error('invalid id'); } // if there's no matching obj for the id
  //   return matchObj['name'];
  // }

  idToName(id: string, idToNameHashArray: any) {
    if (!id) {return ''; }
    const matchObj = idToNameHashArray.find(item => item.id === id) || idToNameHashArray.find(item => item._id === id)
    if (!matchObj) {throw new Error(`no obj with an id as ${id}`); }
    return matchObj['name'];
  }

}
