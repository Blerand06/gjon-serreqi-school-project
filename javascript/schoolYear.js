const lastYear = moment().subtract(1, 'years').year();
const currentYear = moment().year();
const nextYear = moment().add(1, 'years').year();
const currentMonth = moment().month();

if (currentMonth >= 8) {
  document.getElementById(
    'schoolYear'
  ).innerText = `Viti Shkollor: ${currentYear} - ${nextYear}`;
} else if (currentMonth >= 0 || currentMonth <= 7) {
  document.getElementById(
    'schoolYear'
  ).innerText = `Viti Shkollor: ${lastYear} - ${currentYear}`;
}
