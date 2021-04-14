/*
Rate can be associated with check

Like if 10000 of users are accessing --- and not more than 10% failure is allowed
*/


import http from 'k6/http'
import { check } from 'k6'
import { Rate } from 'k6/metrics'

export let errorRate = new Rate('errors')

export let options = {
  thresholds: {
    errors: ['rate<0.1'] // rate less than 10%
  }
}
//Rate
export default function () {
  // Request URL : https://run.mocky.io/v3/06c14710-742c-4acc-ae37-4546d8679cac
  //method: GET
  //Status code : 200 

  /*Testcase1:

  length is 43 for this body:

  Response body with message
   {
    "Message" : "API Executed Successfully"
    }

 */
  let response = http.get('https://run.mocky.io/v3/0b666ad2-642b-4fe1-9fb7-0e8bfe2feb86');

  // Print the length of the response: since there is no response body for api so length is 0
  console.log(`response body length ${response.body.length} for VU= ${__VU} ITER= ${__ITER}`)  // virtual user number
  const check1 = check(response, {
    'Verify response status 200: ': (r) => r.status === 200,  // should return 200 else test will fail but it will not stop the execution
  })
  errorRate.add(!check1) // i.e if  not 200 , the its failure
  // we use === so along with 200 it will check the data type.

  const check2 = check(response, {
    'Verify body length: ': (r) => r.body.length == 12,  // check the length
  })
  errorRate.add(!check2) // i.e if  not 43 length, the its failure  ---- 50% failure if this is failed
}


/*  Run ----------------
 k6 run _test_/04_Test_rate.js
 k6 run _test_/04_Test_rate.js --vus 5 --duration 5s   with Virtual users
*/