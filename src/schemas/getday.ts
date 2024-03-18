/**
 * Translate Kor day to num
 * @param {string} day - Kor day
 * @returns {number} - num day
 */
function GetDay(day: string): number {
  return "월화수목금".indexOf(day) + 1;
}

export default GetDay;
