import axios from 'axios';
const consul = require('consul')();


let known_api_instances = [];

var watcher = consul.watch({
  method: consul.health.service,
  options: {
    service: 'bagshop-users',
    passing: true
  }
});

watcher.on('change', (data, res) => {
  console.log('Received discovery update: ', data);
  known_api_instances = [];
  data.forEach(entry => {
    known_api_instances.push(`http://${entry.Service.Address}:${entry.Service.Port}`);
  });
  console.log('Known API Instances: ', known_api_instances);
});

watcher.on('error', err => {
  console.error('Consul watcher error: ', err);
})

// const request = (options) => {
//   const headers = new Headers({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
//   });
//
//   const defaults = {headers: headers};
//   options = Object.assign({}, defaults, options);
//
//   return fetch(options.url, options)
//     .then(response => {
//       response.json().then(json => {
//         if(!response.ok) {
//           return Promise.reject(json);
//         }
//         return json;
//       })
//     });
// }
//
// export function getAllUsers() {
//   let baseurl = known_api_instances[Math.floor(Math.random()*known_api_instances.length)];
//
//   return request({
//     url: baseurl + "/users",
//     method: 'GET'
//   });
// };
//
// export function addNewUser(userData) {
//   let baseurl = known_api_instances[Math.floor(Math.random()*known_api_instances.length)];
//
//   return request({
//     url: baseurl + "/users",
//     method: 'POST',
//     body: JSON.stringify(userData)
//   });
// }

export function getHealth() {
  let user_api_instances = [];
  //let baseurl = known_api_instances[Math.floor(Math.random()*known_api_instances.length)];
  let baseurl = 'http://localhost:8080'
  console.log('URL: ', baseurl);

  axios.get(baseurl + '/actuator/health')
    .then(response => {
      console.log('Response is: ', response)
    })

  // return request({
  //   url: baseurl + "/actuator/health",
  //   method: 'GET'
  // });
}
