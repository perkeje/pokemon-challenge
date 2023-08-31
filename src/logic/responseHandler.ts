import Cookies from "universal-cookie";
const cookies = new Cookies();

export type ResponseType400 = keyof (typeof responseCodes)[400];
export type ResponseType401 = keyof (typeof responseCodes)[401];
export type ResponseType403 = keyof (typeof responseCodes)[403];
export type ResponseType404 = keyof (typeof responseCodes)[404];

export const clearCookies = () => {
  cookies.remove("X-CSRF-TOKEN");

  cookies.remove(import.meta.env.VITE_COOKIE_NAME as string);
};

export function redirectTo(location: string, delay = 0) {
  setTimeout(() => {
    window.location.href = location;
  }, delay);
}

export const responseCodes = {
  400: {
    15004: {
      handleResponse() {
        redirectTo("/404");
      },
    },
    15005: {
      handleResponse() {
        redirectTo("/404");
      },
    },
    15006: {
      handleResponse() {
        redirectTo("/404");
      },
    },
    15007: {
      handleResponse() {
        redirectTo("/403");
      },
    },
    18302: {
      handleResponse() {
        cookies.remove("redirectUrl", { path: "/" });
        cookies.remove("OAuth-Code", { path: "/" });
        redirectTo("/403");
      },
    },
  },
  401: {
    11200: {
      handleResponse() {
        clearCookies();
        redirectTo("/login");
      },
    },
    18300: {
      handleResponse() {
        redirectTo("/profile/company");
      },
    },
    18301: {
      handleResponse() {
        cookies.remove("redirectUrl", { path: "/" });
        cookies.remove("OAuth-Code");
        redirectTo("/profile/company");
      },
    },
  },
  403: {
    1011: {
      handleResponse() {
        clearCookies();
        redirectTo("/login");
      },
    },
    18303: {
      handleResponse() {
        cookies.remove("redirectUrl", { path: "/" });
        cookies.remove("OAuth-Code");
        redirectTo("/403");
      },
    },
  },
  404: {
    18304: {
      handleResponse() {
        cookies.remove("redirectUrl", { path: "/" });
        cookies.remove("OAuth-Code");
        redirectTo("/404");
      },
    },
  },
};
