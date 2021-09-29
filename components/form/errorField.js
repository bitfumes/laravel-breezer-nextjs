import React, { useState } from "react";

export default function useErrorField() {
  const [errors, setErrors] = useState({});

  function ShowError({ name }) {
    const msg = errors[name]
      ? typeof errors[name][0] === Array
        ? errors[name][0]
        : errors[name]
      : null;

    return msg ? (
      <span className="text-xs text-red-500">{msg}</span>
    ) : (
      <span></span>
    );
  }

  return { errors, setErrors, ShowError };
}
