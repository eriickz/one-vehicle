import ky, { isHTTPError } from "ky";

export const apiClient = ky.create({
  prefix: process.env.EXPO_PUBLIC_API_URL,
  hooks: {
    beforeError: [
      async ({ error, request, options }) => {
        if (isHTTPError(error)) {
          if (
            typeof error.data === "object" &&
            error.data !== null &&
            "message" in error.data
          ) {
            error.message = `${String(error.data.message)}`;
          }
        }

        console.log(`Request to ${request.url} failed`, options.context, error);
        return error;
      },
    ],
  },
});
