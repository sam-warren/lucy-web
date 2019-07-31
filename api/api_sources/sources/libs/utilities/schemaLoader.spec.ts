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
 * File: schemaLoader.spec.ts
 * Project: lucy
 * File Created: Tuesday, 23rd July 2019 12:16:46 pm
 * Author: pushan
 * -----
 * Last Modified: Tuesday, 23rd July 2019 12:17:00 pm
 * Modified By: pushan
 * -----
 */
// Test For SchemaLoader
import { expect } from 'chai';
import { SchemaLoader} from './schemaLoader';

describe('Test Schema Loader', () => {
    it('should verify', () => {
        const data = {
            name: 'lao',
            description: 'x',
            columns: {
                xyz: {
                    name: 'xyz',
                    comment: 'xyz is column',
                    definition: 'test'
                }
            }
        };
        const schemaObj = {
            schemas: {
                Schema: data
            }
        };
        const schemaLoader = new SchemaLoader(schemaObj);
        expect(schemaLoader.verify()).to.be.equal(true);
    });
});

// ---------------------------------------------------------------------------
