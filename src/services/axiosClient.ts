import axios from "axios";

// Define the axiosClient that will be injected into the service functions
// It is also possible to create a client with the fetch API instead of axios, as long as it adheres to the IApiClient interface

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
