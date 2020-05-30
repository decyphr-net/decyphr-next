const urls = {
  login: 'auth/',
  register: 'users/',
  languages: 'languages/',
  dashboard: 'dashboard/'
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
  setState,
  setErrors,
  authRequired
}) {

  const headers = getHeaders(authRequired)
  console.log(headers)

  let response = await fetch(
    process.env.api + urls[endpointName], {
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