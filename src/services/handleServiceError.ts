import { AxiosError } from "axios";

// Differentiate between HTTP errors and network/connection errors

export function handleServiceError(err: unknown) {
  if (err instanceof AxiosError) {
    if (err.response) {
      console.log(`HTTP error: ${err.response.status}`);
    } else if (err.request) {
      console.log(`Network error: ${err.request}`);
    } else {
      console.log(`Unknown Axios error: ${err.message}`);
    }
    return err;
  } else {
    const error = new Error(`Unexpected error: ${err}`);
    console.log(error.message);
    return error;
  }
}
