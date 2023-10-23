export default function underAgeValidate(dob) {
  // returns the month (from 0 to 11)
  const month = dob.split(' ')[1];

  // returns the day of the month (from 1 to 31)
  const day = dob.split(' ')[2];

  // returns the year (four digits)
  const year = dob.split(' ')[3];

  const birthday = `${year}-${month}-${day}`;

  // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
  const optimizedBirthday = birthday.replace(/-/g, '/');

  //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
  const myBirthday = new Date(optimizedBirthday);

  // set current day on 01:00:00 hours GMT+0100 (CET)
  const currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00';

  // calculate age comparing current date and borthday
  const myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);

  if (myAge < 18) {
    return false;
  } else {
    return true;
  }
}
