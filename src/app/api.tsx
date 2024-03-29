import exp from "constants";

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

export function GetCustomer(id?: Number, customerName?: string){
  const url = `https://localhost:7151/api/Customers?customerName=${customerName}&customerId=${id}`;
  const callType = 'GET';
  return CallApi(url, callType);
}

export function LoadCustomer(id: number){
  const url = `https://localhost:7151/api/Customers/${id}`;
  const callType = 'GET';
  return CallApi(url, callType);
}

export function GetOrders(customerId?: Number, customerName?: string, jobTitle?: string, orderId?: Number, branch?: string){
  const isOrderSearch = orderId ? true : false;

  const url = isOrderSearch ? `https://localhost:7151/api/JobOrders?orderId=${orderId}`
  : `https://localhost:7151/api/JobOrders?customerName=${customerName}&customerId=${customerId}&jobTitle=${jobTitle}&branch=${branch}`;
  const callType = 'GET';
  return CallApi(url, callType);
}

export function LoadOrdersByCustomer(customerId?: Number){
  const url = `https://localhost:7151/api/JobOrders?customerId=${customerId}`;
  const callType = 'GET';
  return CallApi(url, callType);
}

export function LoadOrder(id: Number){
  const url = `https://localhost:7151/api/JobOrders/${id}`;
  const callType = 'GET';
  return CallApi(url, callType); 
}

export function PostOrder(data: string){
  const url = 'https://localhost:7151/api/JobOrders';
  const callType = 'POST';
  return CallApi(url, callType, data);
}

export function PostAssignment(data: string){
  const url = 'https://localhost:7151/api/Assignments';
  const callType = 'POST';
  return CallApi(url, callType, data);
}

export function GetAssignments(assignmentId?: Number, lastName?: string, firstName?: string, customerId?: Number, customerName?: string, jobTitle?: string, orderId?: Number, branch?: string){
  const url = `https://localhost:7151/api/Assignments?firstName=${firstName}&lastName=${lastName}&assignmentId=${assignmentId}&customerName=${customerName}&customerId=${customerId}&jobTitle=${jobTitle}&orderId=${orderId}&branch=${branch}`
  const callType = 'GET';
  return CallApi(url, callType);
}