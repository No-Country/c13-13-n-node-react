export const GET = async(url)=> {
    let response = await fetch(url);
    let result = await response.json();
    return result
 }



export const POST = async (url , data) => {
try {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
const result = await response.json();
return result
} catch (error) {
  console.log("ERROR");
  return error
}
  }
  
  export const PUT = async (url , data) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    const result = await response.json();
    return result
    } catch (error) {
      console.log("ERROR");
      return error
    }
      }
