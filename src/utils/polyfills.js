// eslint-disable-next-line import/prefer-default-export
export function closestPolyfill() {
  if (typeof window !== 'undefined' && typeof window.Element !== 'undefined') {
    return;
  }

  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = (s) => {
      let el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
}
