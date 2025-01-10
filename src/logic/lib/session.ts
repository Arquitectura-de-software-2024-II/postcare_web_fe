import "server-only";
import { cookies } from "next/headers";

interface Tokens {
  access: string;
  refresh: string;
}

export async function createSession(tokens: Tokens) {
  const accessToken = tokens.access;
  const refreshToken = tokens.refresh;
  // console.log(Date.now().toString());
  const accessExpiresAt = new Date(Date.now() + 1000 * 60 * 5 ); // 1.5 hours
  const refreshExpiresAt = new Date(Date.now() + 1000 * 60 * 60* 24 ); // 24 hours
  const cookieStore = await cookies();

  cookieStore.set("access", accessToken, {
    // httpOnly: true,
    secure: true,
    expires: accessExpiresAt,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refresh", refreshToken, {
    // httpOnly: true,
    secure: true,
    expires: refreshExpiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("access", accessToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 5),
    sameSite: "lax",
    path: "/",
  });
  
}

export async function createApikey() {
  const cookieStore = await cookies();

  cookieStore.set("apikey","7B5zIqmRGXmrJTFmKa99vcit", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  
}


export async function deleteSession() {
  const cookieStore = await cookies(); // Obtén el cookieStore.
  // Borra las cookies relacionadas después del logout.
  cookieStore.delete("refresh");
  cookieStore.delete("access");
}


