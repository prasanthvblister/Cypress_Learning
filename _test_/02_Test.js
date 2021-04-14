import http from 'k6/http'
import { check } from 'k6'

//Checks
export default function () {
  // Request URL : https://run.mocky.io/v3/06c14710-742c-4acc-ae37-4546d8679cac
  //method: GET
  //Status code : 200 

  //Testcase1:
  // http.get('https://run.mocky.io/v3/06c14710-742c-4acc-ae37-4546d8679cac');


  //Testcase2: to check the response
  let response = http.get('https://run.mocky.io/v3/06c14710-742c-4acc-ae37-4546d8679cac');


  // Print the length of the response: since there is no response body for api so length is 0

  console.log(`response body length ${response.body.length} for VU= ${__VU} ITER= ${__ITER}`)  // virtual user number

  check(response, {
    'is response status 200: ': (r) => r.status === 200,  // should return 200 else test will fail but it will not stop the execution
    'Verify body length: ': (r) => r.body.length == 0,  // check the length
  })
  // we use === so along with 200 it will check the data type.
}



/*  Run ----------------
 k6 run _test_/02_Test.js
 k6 run _test_/02_Test.js --vus 5 --duration 5s   with Virtual users
*/