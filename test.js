// const assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });

//     it('should return 1 when the value is present', function() {
//       assert.notEqual([1,2,3].indexOf(2), -1);
//     });
//   });
// });

const axios = require('axios')

axios.get(`http://localhost:3004/users/23`)
  .then(({ data, status, headers, statusText, request }) => {
    console.log('>>>>>>>>>>> data', data)
    console.log('>>>>>>>>>>> status', status)
    console.log('>>>>>>>>>>> headers', headers)
    console.log('>>>>>>>>>>> statusText', statusText)
  })
