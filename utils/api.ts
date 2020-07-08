const urls = {
  login: 'users/login/',
  register: 'users/register/',
  languages: 'languages/',
  dashboard: 'dashboard/',
  bookSearch: 'books/?name=',
  readingSession: 'reading-sessions/',
  translate: 'translate/',
  practiceSessions: 'practice-sessions/sessions/'
}

function getHeaders(authRequired: boolean) {
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

export default async function api<T>(
  method: string,
  endpointName: string,
  setState: ((_: any) => any),
  setErrors: ((_: any) => any),
  authRequired: boolean,
  data?: T,
  params?: string,
  pk?: string,
) {
  const headers = getHeaders(authRequired)
  let server = process.env.API

  let url = pk ? server + urls[endpointName] + pk + "/" : server + urls[endpointName];
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