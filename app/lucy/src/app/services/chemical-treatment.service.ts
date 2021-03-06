/*
 * Copyright © 2019 Province of British Columbia
 * Licensed under the Apache License, Version 2.0 (the "License")
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * **
 * http://www.apache.org/licenses/LICENSE-2.0
 * **
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * File: chemical-treatment.service.ts
 * Project: lucy
 * File Created: Wednesday, 18th December 2019 12:35:46 pm
 * Author: awilliam (you@you.you)
 * -----
 * Last Modified: Wednesday, 18th December 2019 12:36:13 pm
 * Modified By: awilliam (you@you.you>)
 * -----
 */

import { Injectable } from '@angular/core';
import { ApiService, APIRequestMethod } from './api.service';
import { ChemicalTreatment, HerbicideTankMix, SpeciesObservedTreated } from '../models/ChemicalTreatment';
import { AppConstants } from '../constants';
import { ObjectValidatorService } from './object-validator.service';
import { DummyService } from './dummy.service';

export interface ChemicalTreatmentDiffResult {
  changed: boolean;
  newChemicalTreatment: ChemicalTreatment;
  originalChemicalTreatment: ChemicalTreatment;
  diffMessage: string;
  changes: Object;
}

@Injectable({
  providedIn: 'root'
})
export class ChemicalTreatmentService {

  constructor(private api: ApiService, private objectValidator: ObjectValidatorService, private dummyService: DummyService) { }

  /**
   * Creates json body for chemical treatment creation.
   * @param object ChemicalTreatment
   */
  private body(object: ChemicalTreatment): any {
    /**
     * Note: If your observation ends up having nested objects,
     * this function will no longer work for compare() in this class.
     * You'll need to create a similar function to "flatten" an observation.
     */
    const body = {
      chemical_treatment_id: object.chemical_treatment_id || undefined,
      latitude: +String(object.latitude),
      longitude: +String(object.longitude),
      length: +String(object.length),
      width: +String(object.width),
      firstApplicator: object.firstApplicator,
      secondApplicator: object.secondApplicator,
      date: object.date,
      pesticideEmployer: object.pesticideEmployer.pesticide_employer_code_id,
      pup: object.pup,
      pmp: object.pmp,
      primaryPaperFileReference: object.primaryPaperFileReference,
      secondaryPaperFileReference: object.secondaryPaperFileReference,
      comment: object.comment,
      speciesAgency: object.speciesAgency.species_agency_code_id,
      jurisdiction: object.jurisdiction.jurisdiction_code_id,
      treatmentMethod: object.treatmentMethod.chemical_treatment_method_id,
      humidity: object.humidity,
      temperature: object.temperature,
      windSpeed: object.windSpeed,
      windDirection: object.windDirection.wind_direction_code_id,
      mixDeliveryRate: object.mixDeliveryRate,
      tankMixes: object.tankMixes,
      speciesObservations: object.speciesObservations,
    };

    return body;
  }

  public async submit(chemicalTreatment: ChemicalTreatment): Promise<boolean> {
    // You shouldn't use the object directly because api expects ids, not objects
    const chemicalTreatmentBody = this.body(chemicalTreatment);
    console.dir(chemicalTreatment);

    // Make the call
    const response = await this.api.request(APIRequestMethod.POST, AppConstants.API_chemicalTreatment, chemicalTreatmentBody);
    if (response.success) {
      console.dir(response.response);
      const _Id = response.response[`chemical_treatment_id`];
      if (_Id) {
        console.log(`Created successfully`);
        return true;
      } else {
        console.log(`Got a response, but something is off - id is missing`);
        console.dir(response);
        return false;
      }
    } else {
      console.log(`chemical treatment creation failed`);
      console.dir(response);
      return false;
    }
  }

  /**
   * Submit changes for a Chemical Treatment.
   * Send Full object
   */
  public async editChemicalTreatment(chemicalTreatment: ChemicalTreatment): Promise<boolean> {
    // You shouldn't use the object directly because api expects ids, not objects
    const body = this.body(chemicalTreatment);

    // Make the call
    const response = await this.api.request(APIRequestMethod.PUT, AppConstants.API_chemicalTreatmentWith(chemicalTreatment.chemical_treatment_id), body);
    if (response.success) {
      const _Id = response.response[`chemical_treatment_id`];
      if (_Id) {
        console.log(`Edited successfully`);
        return true;
      } else {
        console.log(`Got a response, but something is off - id is missing`);
        console.dir(response);
        return false;
      }
    } else {
      console.log(`chemical treatment edit failed`);
      console.dir(response);
      return false;
    }
  }

  /**
   * Submit changes for a Chemical Treatment.
   * Send Only changes
   */
  public async editChemicalTreatmentChangeOnly(newChemicalTreatment: ChemicalTreatment, oldChemicalTreatment: ChemicalTreatment): Promise<boolean> {
    const changes = await this.compare(newChemicalTreatment, oldChemicalTreatment);
    console.dir(changes);
    // Make the call
    const response = await this.api.request(APIRequestMethod.PUT, AppConstants.API_chemicalTreatmentWith(newChemicalTreatment.chemical_treatment_id), changes);
    if (response.success) {
      const chemicalTreatment_Id = response.response[`chemical_treatment_id`];
      if (chemicalTreatment_Id) {
        console.log(`Edited successfully`);
        console.dir(response.response);
        return true;
      } else {
        console.log(`Got a response, but something is off - id is missing`);
        console.dir(response);
        return false;
      }
    } else {
      console.log(`chemical treatment edit failed`);
      console.dir(response);
      return false;
    }
  }

  /**
   * Fetch and returns all ChemicalTreatment objects
   */
  public async getAll(): Promise<ChemicalTreatment[]> {
    const response = await this.api.request(APIRequestMethod.GET, AppConstants.API_chemicalTreatment, null);
    if (response.success && Array.isArray(response.response) && this.objectValidator.isChemicalTreatmentObject(response.response[0])) {
      return response.response;
    } else {
      return[];
    }
  }

  /**
   * Fetch and return a specific Chemical Treatment
   * @param id Chemical Id
   */
  public async getWithId(id: number): Promise<ChemicalTreatment | undefined> {
    const response = await this.api.request(APIRequestMethod.GET, AppConstants.API_chemicalTreatmentWith(id), null);
    console.dir(response);
    if (response.success && this.objectValidator.isChemicalTreatmentObject(response.response)) {
      console.dir(response);
      return response.response;
    } else {
      return undefined;
    }
  }

  public getEmptyObject(): ChemicalTreatment {
    const object: ChemicalTreatment = {
      chemical_treatment_id: -1,
      latitude: undefined,
      longitude: undefined,
      length: undefined,
      width: undefined,
      firstApplicator: undefined,
      secondApplicator: undefined,
      pesticideEmployer: undefined,
      speciesAgency: undefined,
      date: undefined,
      primaryPaperFileReference: undefined,
      secondaryPaperFileReference: undefined,
      jurisdiction: undefined,
      pmp: undefined,
      pup: undefined,
      treatmentMethod: undefined,
      humidity: undefined,
      temperature: undefined,
      windSpeed: undefined,
      windDirection: undefined,
      mixDeliveryRate: undefined,
      tankMixes: undefined,
      speciesObservations: undefined,
      comment: undefined,
    };
    return object;
  }

  ////////////////////////////// Diff //////////////////////////////

  /**
   * Compare specified ChemicalTreatment object with its original version.
   * if undefinied is returned, there was a failure
   * @param chemicalTreatment ChemicalTreatment
   * @return ChemicalTreatmentDiffResult | undefined
   */
  public async diffChemicalTreatment(chemicalTreatment: ChemicalTreatment): Promise<ChemicalTreatmentDiffResult | undefined> {
    // 1) Fetch the latest original
    const original = await this.getWithId(chemicalTreatment.chemical_treatment_id);
    // if couldnt fetch the original, return undefind
    if (!original) {
      return undefined;
    }
    // 2) Compare
    const changes = this.compare(chemicalTreatment, original);
    // if comparison fails, return undefinied.
    if (!changes) {
      return undefined;
    }

    // 3) Successfully diffed, generate response

    // Convert keys from camel case:
    const keys =  Object.keys(changes).map(x => {
      const fromCamel = x.replace( /([A-Z])/g, ` $1` );
      return fromCamel.charAt(0).toUpperCase() + fromCamel.slice(1);
    });
    const changedKeys = keys.join(`, `);
    const changed = changedKeys.length > 1;
    return {
      changed: changed,
      newChemicalTreatment: chemicalTreatment,
      originalChemicalTreatment: original,
      diffMessage: changedKeys,
      changes: changes
    };
  }

  /**
   * Compare a change Object to original ChemicalTreatment
   * and return a string describing what changed.
   * @param changes Object
   * @param original ChemicalTreatment
   */
  private createDiffMessage(changes: Object, original: ChemicalTreatment): string {
    // TODO: This function needs to be tweaked for usage: handle codes & date format
    let msg = ``;
    const originalTreatment = JSON.parse(JSON.stringify(this.body(original)));
    Object.keys(changes).forEach(function (key, index) {
      const originalValue = originalTreatment[key];
      msg = `${msg}* ${key}: From: ${originalValue} -> To: ${changes[key]}\n`;
    });
    console.log(msg);
    return msg;
  }

  /**
   * Compare 2 ChemicalTreatment objects
   * and return Object containing differences
   * between the two.
   * * Note: This function uses this.body()
   * and doesnt use the objects that are passed in directly.
   * @param chemicalTreatment ChemicalTreatment
   * @param original ChemicalTreatment
   */
  public compare(chemicalTreatment: ChemicalTreatment, original: ChemicalTreatment): Promise<Object | undefined> {
    const originalTreatment = JSON.parse(JSON.stringify(this.body(original)));
    const newTreatment = JSON.parse(JSON.stringify(this.body(chemicalTreatment)));
    const r = this.diff(originalTreatment, newTreatment);
    return r;
  }

  /**
   * Compare 2 JSON object and
   * return Object containing differences
   * between the two.
   * * Note: Keys should be in the same order
   * @param obj1 JSON object
   * @param obj2 JSON object
   */
  private diff(obj1: JSON, obj2: JSON): any {
    const result = {};
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = obj2[key];
        }
        if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
            const value = this.diff(obj1[key], obj2[key]);
            if (value !== undefined) {
                result[key] = value;
            }
        }
    });
    return result;
  }
  //////////////////////////////  Diff //////////////////////////////
}
