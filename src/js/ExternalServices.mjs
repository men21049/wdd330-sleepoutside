const baseURL = import.meta.env.VITE_SERVER_URL;
const checkoutURL = import.meta.env.CHECKOUT_URL;

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    // Try to extract error body if available
    let errorBody;
    try {
      errorBody = await res.text(); // fallback: use .text() to avoid JSON parsing errors
    } catch (e) {
      errorBody = "[No response body]";
    }

    throw new Error(`HTTP ${res.status} ${res.statusText} - ${errorBody}`);
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    try {
      const response = await fetch(`${baseURL}/products/search/${category}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await convertToJson(response);
      return data.Result;
    } catch (err) {
      console.error("Failed to fetch data:", err);
      return [];
    }
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}/product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}/checkout/`, options).then(convertToJson);
  }
}
