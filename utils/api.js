const urls = {
  login: 'auth/',
  register: 'users/',
  languages: 'languages/',
  dashboard: 'dashboard/',
  bookSearch: 'books/?name='
}

function getHeaders(authRequired) {
  if (authRequired) {
    return {
      'Content-type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }
  } else {
    return {
      'Content-type': 'application/json'
    }
  }
}

export default async function api({
  method,
  endpointName,
  data,
  params,
  pk,
  setState,
  setErrors,
  authRequired
}) {

  const headers = getHeaders(authRequired)

  let url = pk ? process.env.api + urls[endpointName] + pk + "/" : process.env.api + urls[endpointName];
  url = params ? url + params : url;

  let response = await fetch(
    url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
  })

  let result = await response.json()

  if (response.status === 200 || response.status === 201) {
    setState(result)
  } else {
    setErrors(result)
  }
}