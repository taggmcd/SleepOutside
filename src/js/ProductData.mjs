function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
const baseURL = import.meta.env.VITE_SERVER_URL

export default class ProductData {
  async getData(category) {
    console.log(category);
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    console.log(data)
    return data.Result; // has to have Result for the fetch from the server
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
