export const BASE_URL = window.location.origin;

export const getImageUrl = (path) => {
  if (!path) return "";

  // already full URL
  if (path.startsWith("http")) {
    return path;
  }

  return `${BASE_URL}${path}`;
};

export const DATA_URL = `${BASE_URL}/data.json`;

export const getData = async () => {
  try {
    const res = await fetch(DATA_URL);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};