import http from 'k6/http'
import { check } from 'k6'

//Checks
export default function () {
  // Request URL : https://run.mocky.io/v3/0b666ad2-642b-4fe1-9fb7-0e8bfe2feb86
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
  check(response, {
    'Verify response status 200: ': (r) => r.status === 200,  // should return 200 else test will fail but it will not stop the execution
    'Verify body length: ': (r) => r.body.length == 43,  // check the length
  })
  // we use === so along with 200 it will check the data type.
}


/*  Run ----------------
 k6 run _test_/03_Test.js
 k6 run _test_/03_Test.js --vus 5 --duration 5s   with Virtual users
*/