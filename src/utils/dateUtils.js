import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export function getTimeDifference(millisecond) {
  const currentmillis = Date.now();
  const diffmillisecond = currentmillis - millisecond;
  const seconds = Math.floor(diffmillisecond / 1000);
  const minutes = Math.floor(diffmillisecond / (1000 * 60));
  const hours = Math.floor(diffmillisecond / (1000 * 60 * 60));
  const days = Math.floor(diffmillisecond / (1000 * 60 * 60 * 24));

  if (seconds < 60) {
    return `${seconds + (seconds > 1 ? ' Seconds' : ' Second')} ago`;
  }
  if (minutes < 60) {
    return `${minutes + (minutes > 1 ? ' Min' : ' Mins')} ago`;
  }
  if (hours < 24) {
    return `${hours + (hours > 1 ? ' Hrs' : ' Hr')} ago`;
  }
  return `${days + (days > 1 ? ' Days' : ' Day')} ago`;
}
export function getDate(tmstmp) {
  const theDate = new Date(tmstmp);
  const dateString = theDate.toGMTString();
  return dateString;
}

export default {
  getTimeDifference,
  getDate,
};

export function addPaddingZeros(num, totalDigits) {
  if (!(typeof num === 'number' || typeof num === 'string')) {
    return '';
  }
  let numberStr = num.toString();
  const numberLength = numberStr.length;
  if (numberLength < totalDigits) {
    for (let i = 0; i < totalDigits - 1; i += 1) {
      numberStr = `0${numberStr}`;
    }
  }
  return numberStr;
}

export function getSEOFriendlyDate(tmstmp) {
  if (!tmstmp) {
    return '';
  }

  const dateString = `${dayjs.tz(Number(tmstmp), 'Asia/Calcutta').format()}`;
  return dateString;
}
export function getSEOFriendlyEndDate(timestmp) {
  if (!timestmp) {
    return '';
  }

  const dateString = `${dayjs
    .tz(Number(timestmp) + 1000 * 60 * 60 * 24 * 2, 'Asia/Calcutta')
    .format()}`;

  return dateString;
}

export function getAuthorDetailDate(tmstmp){
  const datePattern = /^[A-Za-z]{3} \d{2} \d{4}$/; // Matches format like "Nov 08 2024"

  if (typeof tmstmp === 'string' && datePattern.test(tmstmp)) {
    return tmstmp; // Return as is if it matches the pattern
  }
  let str ='Updated ' +
  dayjs
    .tz(Number(tmstmp), 'Asia/Calcutta')
    .format(
      `MMM D, YYYY${
       '[,] hh:mm A [IST]'
      }`);
      return str;
}
