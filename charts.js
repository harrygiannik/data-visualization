var queryResults = {};

function getData() {
	fetch('/getData', {
    method: 'POST',
    headers: {
        'Content-type': 'text/plain'
    }
  }).then(data => {
  	return data.json()
  }).then(res => {queryResults = res})
  .catch(error => console.error('Error:', error));
  console.log(queryResults[0])
  Object.getOwnPropertyNames(queryResults[0])[0];
};

