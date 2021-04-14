// call google.com - https://www.google.com/

import http from 'k6/http'

// export let options ={
//     // Declare the Vus and duration config
// vus: 10,
// duration : '10s' /* 1m2s */
// }

//Ramp up and Ramp Down 
export let options = {
    stages: [
        { duration: '10s', target: 5 }, // 5 users for 10s
        { duration: '20s', target: 3 }, // 5+3 users for next 20s
        { duration: '20s', target: 0 }
    ]
}

export default function () {

    http.get('https://www.google.com/');
}


/*add more virtual users
k6 run --vus 10 --duration 10s _test_/01_Test.js
*/