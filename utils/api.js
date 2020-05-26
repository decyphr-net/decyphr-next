const headers = {
  'Content-type': 'application/json'
}

const urls = {
  login: "auth/"
}

export default async function api({
  method,
  endpointName,
  data,
  setState,
  setErrors
}) {
  let response = await fetch(
    process.env.api + urls[endpointName], {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
  })

  let result = await response.json()

  if (response.status === 200) {
    setState(result)
  } else {
    setErrors(result)
  }
}