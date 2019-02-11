const apiUrl = process.env.REACT_APP_API_URL;

const api = {
  async get(endpoint) {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`);
      return await response.json();
    } catch (err) {
      console.error(err);
      return {};
    }
  },
  async post(endpoint, data, secretToken) {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${secretToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (err) {
      console.error(err);
      return {};
    }
  }
};

export default api;
