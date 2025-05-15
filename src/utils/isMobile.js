
export const getDeviceType = (headers)=>{
  const userAgent = headers['user-agent'] || '';
  const isMobile = /Mobile|Android|BlackBerry|IEMobile|Silk/.test(userAgent);
  return isMobile ? 'mobile' : 'desktop';
}

export const  isMobile=()=> {
  let check = false;

  // Check for ismobile on server
  if (
    typeof window === 'undefined' &&
    typeof global === 'object' &&
    global.isMobileUserAgent
  ) {
    check = true;
  }
  // Check for ismobile on browser using state.isMobile
  else if (
    typeof navigator !== 'undefined' &&
    /Mobi|Android/i.test(navigator.userAgent)
  ) {
    check = true;
  }

  return check;
}


