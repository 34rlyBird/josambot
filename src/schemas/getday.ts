function GetDay(day: string) {
  const dayList = ["월", "화", "수", "목", "금"];
  let i = 0;
  for (i = 0; i < dayList.length; i += 1) {
    if (day === dayList[i]) {
      return i + 1;
    }
  }
  return 0;
}

export default GetDay;
