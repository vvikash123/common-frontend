export function isAMPRequest() {
  const check = false;
  // Check for is AMP on server
  if (typeof window === 'undefined' && typeof global === 'object') {
    const urlSegment = global.pathname?.split('?')[0]?.split('/');
    if (urlSegment && urlSegment[urlSegment.length - 1] === 'amp') {
      return true;
    }
  }
  return check;
  /*
const check = false;
  // check for is amp on server
  const urlSegment =
    typeof global === 'object' && global?.pathname?.split('?')[0]?.split('/');
  if (
    typeof window === 'undefined' &&
    typeof global === 'object' &&
    // global.isAmpRequest
    urlSegment[urlSegment.length - 1] === 'amp'
  ) {
    return true;
  }
  return check;
  */
}
export default isAMPRequest;
