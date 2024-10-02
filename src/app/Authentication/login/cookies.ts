export const getCookie = (name: string): string | null => {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]*)`);
    return cookieValue ? cookieValue[2] : null;
  };
    
  export const setCookie = (name: string, value: string, expires?: number) => {
      let cookie = `${name}=${value}; path=/;`;
      if (expires) {
        cookie += `expires=${new Date(Date.now() + expires * 1000).toUTCString()};`;
      }
      document.cookie = cookie;
    };
    
  export const deleteCookie = (name: string) => {
      setCookie(name, "", -1);
    };