
var count = 0;

function CallApi(
  url: string, callType: string, data?: string
){
  const abortController = new AbortController();

  return fetch(url, {
    signal: abortController.signal,
      method: callType,
      headers: { 'Content-Type': 'application/json' },
      body: callType === 'POST' ? data : null,
    })
    .then(result => {
      if (result.status === 200) {
        return result.text();
      } else if (result.status === 401) {
        window.location.reload();
      } else if (result.status === 503 || result.status === 500) {
        setTimeout(() => {
          count++
          if (count < 3)
            RetryFetch(url, callType, data!)
          else
            throw new Error('Data did not update')
        }, 1000)
      }
      else if (!result.ok) {
        result.text().then(text => {
          if (text === "Database 'Employnet' cannot be opened. It is in the middle of a restore.") {
            setTimeout(() => {
              count++
              if (count < 3)
                RetryFetch(url, callType, data!)
              else
                throw Error(result.statusText)
            })
          }
        })
      }
    })
    .then(returnData => {
      return (returnData ? JSON.parse(returnData) : {});
    })
    .catch(error => {
      console.error(error.message);
    });
}

function RetryFetch(url: string, callType: string, data: string) {
  CallApi(url, callType, data);
};

export function PostEmployee(data: string){
  const url = 'https://localhost:7151/api/Employees';
  const callType = 'POST';
  return CallApi(url, callType, data);
}

export function GetEmployee(id?: Number, firstName?: string, lastName?: string){
  console.log(id);
  console.log(firstName);
  console.log(lastName);
  const url = `https://localhost:7151/api/Employees?id=${id}&firstName=${firstName}&lastName=${lastName}`;
  const callType = 'GET';
  return CallApi(url, callType);
}

export function LoadEmployee(id: number){
  const url = `https://localhost:7151/api/Employees/${id}`;
  const callType = 'GET';
  return CallApi(url, callType);
}

export function PostCustomer(data: string){
  const url = 'https://localhost:7151/api/Customers';
  const callType = 'POST';
  return CallApi(url, callType, data);
}