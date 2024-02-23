const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);

  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();

  const minutes =
    date.getUTCMinutes() < 10
      ? "0" + date.getUTCMinutes()
      : date.getUTCMinutes();

  const seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
};

export default formatTimestamp;
