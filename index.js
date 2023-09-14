// Get days in year
const getDaysInYear = (year) => {
  return new Date(year, 1, 28).toDateString().split(" ")[1] ===
    new Date(year, 1, 29).toDateString().split(" ")[1]
    ? 366
    : 365;
};

// Get day of a year
const getDayNumber = (day) => {
  const currentYear = new Date().getFullYear();
  const dayOfYear = new Date(Date.UTC(currentYear, 0, day));
  const month =
    dayOfYear.getMonth() < 10
      ? "0" + dayOfYear.getMonth()
      : dayOfYear.getMonth();

  const dayMonth =
    dayOfYear.getDate() < 10 ? "0" + dayOfYear.getDate() : dayOfYear.getDate();

  return `${currentYear}-${month}-${dayMonth}`;
};

// Get fiscal quarters
const getQuarters = (strdate) => {
  const date = new Date(strdate);
  const numMonts = date.getMonth();
  const dateFormat = date.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
  });
  let quarter = "";
  switch (numMonts) {
    case 0:
    case 1:
    case 2:
      quarter = "I";
      break;
    case 3:
    case 4:
    case 5:
      quarter = "II";
      break;
    case 6:
    case 7:
    case 8:
      quarter = "III";
      break;
    case 9:
    case 10:
    case 11:
      quarter = "IV";
  }

  return `${dateFormat} is ${quarter} quarter`;
};

// Write a function to calculate date diff
const calcDateDiff = (startDate, endDate) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  let res;
  if (date2.getFullYear() - date1.getFullYear() >= 1) {
    res = res ?? `${date2.getFullYear() - date1.getFullYear()} years`;
  }
  if (date2.getMonth() - date1.getMonth() >= 1) {
    res = res ?? `${date2.getMonth() - date1.getMonth()} months`;
  }
  if (date2.getDate() - date1.getDate() >= 1) {
    res = res ?? `${date2.getDate() - date1.getDate()} days`;
  }
  if (date2.getHours() - date1.getHours() >= 1) {
    let diffHours = date2.getHours() - date1.getHours();
    let diffMin =
      diffHours * 60 === date2 - date1 * 1000 * 60
        ? ""
        : (date2 - date1) / 1000 / 60 - diffHours * 60 + " minutes";

    res = res ?? `${diffHours} hours ${diffMin}`;
  }

  if (date2.getHours() - date1.getHours() < 1) {
    res = res ?? `${(date2 - date1) / 1000 / 60} minutes`;
  }

  return res;
};
