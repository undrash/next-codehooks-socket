export const getFormattedDateTime = () => {
  const date = new Date();

  return `${('0' + date.getDate()).slice(-2)} ${
    [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][date.getMonth()]
  } ${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${(
    '0' + date.getMinutes()
  ).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
};
