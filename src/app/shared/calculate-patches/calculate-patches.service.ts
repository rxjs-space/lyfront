import { Injectable } from '@angular/core';
import jsonpatch from 'fast-json-patch';

@Injectable()
export class CalculatePatchesService {

  constructor() { }
  calculatePatches(
    oldObject: {[key: string]: any},
    newAddOns: {[key: string]: any}) {
    const oldObjectCopy = JSON.parse(JSON.stringify(oldObject));
    const newObject = Object.assign(oldObjectCopy, newAddOns);
    const patches = jsonpatch.compare(oldObject, newObject);
    return patches;
  }

}
