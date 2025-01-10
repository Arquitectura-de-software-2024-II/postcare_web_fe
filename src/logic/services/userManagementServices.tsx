import { loginData, registerData, tokens } from "@/logic/models/authModel";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  
});

export async function postRefreshToken(
  refreshToken: string
): Promise<{ access: string }> {
  const response = await axios
    .post(
      "http://localhost:8080/auth/jwt/refresh/",
      { refresh: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh=${refreshToken}`,
        },
        withCredentials: true,
      }
    )
    .then(function (result) {
      return result.data;
    })
    .catch(() => {
      return { access: "" };
    });
  return response;
}

export async function postRegister(userData: registerData): Promise<{
  awaitState: string;
  error: { detail?: string; email?: string; id_documento?: string };
}> {
  const response = await API.post("/auth/users/", userData)
    .then(function () {
      return {
        error: {},
        awaitState: "success",
      };
    })
    .catch((error) => {
      return {
        error: error?.response?.data ? error.response.data : "error",
        awaitState: "error",
      };
    });

  return response;
}

export async function postDeleteAccount(password: string) {
  return await API.request({
    url: "/auth/users/me/",
    method: "delete",
    data: {
      current_password: password,
    },
  });
}

export async function postVerifyToken(): Promise<{ valid: boolean }> {
  const response = await API.post("/auth/jwt/verify/")
    .then(function () {
      return {
        valid: true,
      };
    })
    .catch(() => {
      return {
        valid: false,
      };
    });
  return response;
}

export async function getUser() {
  const response = await API.get("/auth/users/me/")
    .then(function (result) {
      return result.data;
    })
    .catch((error) => {
      // console.log("hubo error");
      return error.response?.data ? error.response.data : "error";
    });
  return response;
}

export async function postLogin(
  userData: loginData
): Promise<{ awaitState: string; tokens: tokens; error: { detail?: string } }> {
  const response = await API.post("/auth/jwt/create/", userData)
    .then(function (result) {
      return {
        error: {},
        tokens: result.data,
        awaitState: "success",
      };
    })
    .catch((error) => {
      return {
        error: error?.response?.data ? error.response.data : "error",
        tokens: {
          refresh: "",
          access: "",
        },
        awaitState: "error",
      };
    });
  return response;
}

export async function postLogout() {
  const response = API.post("/auth/jwt/logout/").catch((error) => {
    console.log(error);
    return error;
  });
  return response;
}
