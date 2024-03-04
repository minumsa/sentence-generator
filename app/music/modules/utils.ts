export const formatDuration = (seconds: number) => {
  const hours = Math.floor(Math.floor(seconds / 60) / 60);
  const minutes = Math.floor(seconds / 60) % 60;
  const formattedDuration = hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
  return formattedDuration;
};

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const formattedDate = year + "년 " + month + "월 " + day + "일";
  return formattedDate;
};
