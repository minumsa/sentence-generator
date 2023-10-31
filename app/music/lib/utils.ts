export const formatDuration = (seconds: number) => {
  const hours = Math.floor(Math.floor(seconds / 60) / 60);
  const minutes = Math.floor(seconds / 60) % 60;
  const albumDuration = hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
  return albumDuration;
};
