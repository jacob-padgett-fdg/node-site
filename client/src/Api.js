class Api {
    // fetching the GET route from the Express server which matches the GET route from server.js
   static callBackendAPI = async (path) => {
    const response = await fetch(path)
    const body = await response.json()
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body
  }

  static getAvailableOptions = async () => {
      const response = await fetch('/options')
      const body = await response.json()
      if (response.status !== 200) {
          throw Error(body.message)
      }
      const response2 = await fetch('/available-pages')
      const body2 = await response2.json()
      if (response.status !== 200) {
          throw Error(body.message)
      }
    return {siteOptions: body.data, pages: body2.data}
  }

  static getMenu = async () => {
    const response = await fetch('/navigation')
    const body = await response.json()
    if (response.status !== 200){
      throw Error(body.message)
    }
    return body
  }
}

export default Api