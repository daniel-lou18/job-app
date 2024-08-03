import React from "react";

export default function Error({ errorMessage }: { errorMessage: string }) {
  return <p>{errorMessage}</p>;
}
