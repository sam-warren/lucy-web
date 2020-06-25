/**
 *  Copyright © 2019 Province of British Columbia
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * 	Unless required by applicable law or agreed to in writing, software
 * 	distributed under the License is distributed on an "AS IS" BASIS,
 * 	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 	See the License for the specific language governing permissions and
 * 	limitations under the License.
 *
 * 	Created by Amir Shayegh on 2019-10-23.
 */

/**
 * @description Advance declare window obj
 */
declare var window: any;
export class AppConstants {

    // Mussles App
    static get API_WatercraftAssessment_Export(): string { return `${AppConstants.API_baseURL}/mussels/wra/export`;}
    static get API_Shift_Export(): string { return `${AppConstants.API_baseURL}/mussels/workflow/export`;}

    // API authenticated user endpoints
    static get API_me(): string { return `${AppConstants.API_baseURL}/account/me`; }
    static get API_DataEntryAccessRequest(): string { return `${AppConstants.API_baseURL}/request-access`; }
    static get API_messages(): string { return `${AppConstants.API_baseURL}/account/message`; }
    static get API_allUsers(): string { return `${AppConstants.API_baseURL}/account/users`; }

    // Form Config Mechanical
    static get API_Form_MechanicalTreatment(): string { return `${AppConstants.API_baseURL}/treatment/mechanical/config`; }
    // Form Config Observation
    static get API_Form_Observation(): string { return `${AppConstants.API_baseURL}/observation/config`; }

    // Form Config Animal Observation
    static get API_Form_Animal_Observation(): string { return `${AppConstants.API_baseURL}/animal-observation/config`; }

    // Form Config Chemical
    static get API_Form_ChemicalTreatment(): string { return `${AppConstants.API_baseURL}/treatment/chemical/config`; }

    // Observation
    static get API_observation(): string { return `${AppConstants.API_baseURL}/observation`; }
    static get API_observation_Export(): string { return `${AppConstants.API_observation}/export`; }
    static get API_observationSpecies(): string { return `${AppConstants.API_baseURL}/observation/species`; }

    // Form Config Mechanical Monitoring
    static get API_mechanicalMonitor(): string { return `${AppConstants.API_baseURL}/monitor/mechanical/config`; }

    // Code Tables
    static get API_CodeTables(): string { return `${AppConstants.API_baseURL}/codes`; }

    // Mechanical Treatment
    static get API_mechanicalTreatment(): string { return `${AppConstants.API_baseURL}/treatment/mechanical`; }

   // Chemical Treatment
   static get API_chemicalTreatment(): string { return `${AppConstants.API_baseURL}/treatment/chemical`; }

    // API Reference data
    static get API_Roles(): string { return `${AppConstants.API_baseURL}/account/roles`; }

    // SSO
    static SSOConstants = {
        SSO_CLIENT_ID : `invasives-bc`,
        SSO_BASE_URL : `https://sso-dev.pathfinder.gov.bc.ca`,
        SSO_REALM_NAME : `dfmlcg7z`,
        SSO_LOGIN_REDIRECT_URI : `http://${window.location.host}`,
    };

    // API
    static API_baseURL = 'http://localhost:80/api';

    // Default Config
    static CONFIG = {
        apiHost: 'localhost',
        changeVersion: 'NA',
        env: 'dev',
        version: 'NA'
    };

    // ---------- BC Data Catalogue -------------
    static bcDataCatalogue_baseURL = `/bcgeodata`;
    // type name for BC Municipalities boundaries feature layer from BC Data Catalogue
    static bcDataCatalogue_municipalitiesTypeName = `WHSE_LEGAL_ADMIN_BOUNDARIES.ABMS_MUNICIPALITIES_SP`;
    static API_bcDataCatalogue_getLayer(typename: string): string {
        return `${AppConstants.API_baseURL}${AppConstants.bcDataCatalogue_baseURL}?typeName=${typename}`;
    }
    static API_bcDataCatalogue_getMunicipalities(): string {
        return `${AppConstants.API_baseURL}/bcgeodata/municipalities`;
    }
    static API_bcDataCatalogue_getRegionalDistricts(): string {
        return `${AppConstants.API_baseURL}/bcgeodata/regional-districts`;
    }
    static API_bcDataCatalogue_getWells(bbox: string): string {
        return `${AppConstants.API_baseURL}/bcgeodata/wells?bbox=${bbox}`;
    }
    // ------------------------------------------

    static API_observationWith(id: number): string {
        return `${AppConstants.API_baseURL}/observation/${id}`; }
    static API_observationAt(lat: number, long: number): string {
        return `${AppConstants.API_baseURL}/observation?lat=${lat}&long=${long}`;
    }
    static API_mechanicalMonitorWith(id: number): string {
        return `${AppConstants.API_baseURL}/monitor/mechanical/${id}`;
    }
    static API_mechanicalTreatmentWith(id: number): string {
        return `${AppConstants.API_baseURL}/treatment/mechanical/${id}`;
   }
   static API_chemicalTreatmentWith(id: number): string {
       return `${AppConstants.API_baseURL}/treatment/chemical/${id}`;
   }
   static API_tankMix(): string { return `${AppConstants.API_baseURL}/tankmix`; }
   static API_observationChemicallyTreated(): string { return `${AppConstants.API_baseURL}/obschem`; }

    // SSO non static endpoints
    static SSO_LoginEndpoint(): string {
        const baseAuthEndpoint = `${this.SSOConstants.SSO_BASE_URL}/auth/realms/${this.SSOConstants.SSO_REALM_NAME}/protocol/openid-connect`;
        return `${baseAuthEndpoint}/auth?response_type=code&client_id=${this.SSOConstants.SSO_CLIENT_ID}&redirect_uri=${this.SSOConstants.SSO_LOGIN_REDIRECT_URI}`;
    }

    static SSO_TokenEndpoint(): string {
        return `${this.SSOConstants.SSO_BASE_URL}/auth/realms/${this.SSOConstants.SSO_REALM_NAME}/protocol/openid-connect/token`;
    }

    // API Non static endpoints
    static API_user(id: number): string {
        return `${AppConstants.API_baseURL}/account/user/${id}`;
    }

    static API_updateUserMessage(id: number): string {
        return `${AppConstants.API_baseURL}/account/message/${id}`;
    }

    static API_AcessRequestResponse(id: number): string {
        return `${AppConstants.API_baseURL}/request-access/${id}`;
    }

    // BC Government Wearhouse
    static API_BCGW_wellProximity(latitude: number, longitude: number): string {
        return `${AppConstants.API_baseURL}/location/gwells-data?latitude=${latitude}&longitude=${longitude}`;
    }
}


