

export function setSessionData(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  
  export function getSessionData(key: string) {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  export function removeSessionData(key: string) {
    sessionStorage.removeItem(key);
  }
  
  export function clearSession() {
    sessionStorage.clear();
  } 