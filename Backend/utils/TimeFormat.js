export const formatIST = (date) => {
  const utcDate = new Date(date);
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(utcDate.getTime() + istOffset);

  const day = String(istTime.getDate()).padStart(2, "0");
  const month = String(istTime.getMonth() + 1).padStart(2, "0");
  const year = istTime.getFullYear();
  const hours = istTime.getHours() % 12 || 12;
  const minutes = String(istTime.getMinutes()).padStart(2, "0");
  const ampm = istTime.getHours() >= 12 ? "PM" : "AM";

  return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
};
