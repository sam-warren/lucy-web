'use strict';
const {OpenShiftClientX} = require('pipeline-cli')
const checkAndClean = require('./checkAndClean');
const path = require('path');

module.exports = (settings) => {
  const phases = settings.phases
  const options= settings.options
  const phase = options.env
  // const changeId = phases[phase].changeId
  const branch = options.branch;
  const oc= new OpenShiftClientX(Object.assign({'namespace':phases[phase].namespace}, options));
  const templatesLocalBaseUrl =oc.toFileUrl(path.resolve(__dirname, '../../openshift'))
  var objects = []
  var is = [];
  
  // The deployment of your cool app goes here ▼▼▼
  const isName = `${phases[phase].name}`
  const instance = `${isName}-${branch}`;
  const setupTag = `${phases[phase].tag}`
  const image = `${isName}:${setupTag}`;

  if (options.env !== 'build') {
    // Clean existing image 
    checkAndClean(`istag/${image}`, oc);

    // Creating image stream for setup
    is.push(...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/is.yml`, {
      'param': {
        'NAME': `${isName}`
      }
    }));

    oc.applyRecommendedLabels(is,phases[phase].name, phase, `${branch}`, instance);
    oc.importImageStreams(is, setupTag, phases.build.namespace, phases.build.tag);
  }

  
  // Get API image stream
  const data = oc.get(`istag/${image}`) || [];
  if (data.length === 0) {
    console.log('Unable to fetch API imag ref');
    process.exit(0);
  }
  const imageStream = data[0];
  const podName = `${phases[phase].name}`;

  objects.push(...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/pod.yml`, {
    'param':{
        'NAME': podName,
        'SUFFIX': phases[phase].suffix,
        'VERSION': phases[phase].tag,
        'IMAGE': imageStream.image.dockerImageReference
      }
  }))
  checkAndClean(`pod/${podName}`, oc);
  oc.applyRecommendedLabels(objects, phases[phase].name, phase, `${branch}`, instance)
  oc.applyAndDeploy(objects, phases[phase].instance)
}
