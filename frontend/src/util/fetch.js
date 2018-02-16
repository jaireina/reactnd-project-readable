const API_KEY = 'parangaricutirimicuaro';
const URL_BASE = 'http://localhost:3001';

/**
 * Creates a fetch function that performs a request to the server using an HTTP method defined by type. 
 * 
 * @param {string} type of HTTP method to use (GET, POST, PUT, DELETE)
 * @returns {Function} to do a fetch call
 */
function createFetchFunction (type) {
  /**
   * The function returned uses the path provided to build the request URL, 
   * sends the data provided to the SERVER in a JSON format and sets the headers 
   * required by the API
   * @param {string} path to the API endpoint
   * @param {Object} data to sent to the server
   * @returns {Promise} with the server's response
   */
  return function (path, data) {
    return fetch( `${URL_BASE}${path}` , 
                  { 
                    method: type,
                    body: JSON.stringify(data),
                    headers: { 'Authorization': API_KEY, 'Content-Type': 'application/json' }
                  }
                )
                .then( res => res.json() );
  }
}

export const doGet = createFetchFunction('GET');
export const doPost = createFetchFunction('POST');
export const doPut = createFetchFunction('PUT');
export const doDelete = createFetchFunction('DELETE');
