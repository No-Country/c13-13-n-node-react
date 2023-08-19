export const GET = async(url)=> {
    let response = await fetch(url);
    let result = await response.json();
    return result
 }



export const POST = async (url , data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    const result = await response.json();
    return result
      
  }
  

