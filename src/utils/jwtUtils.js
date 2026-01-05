/*export function parseJwt(token){
    if(!token) return null;

    try{
        const base64Url =token.spilt(".")[1];
        const base64 =base64Url.replace(/-/g,"+").replace(/_/g,"/");
        return JSON.parse(atob(base64));
    }
    catch (error) {
    console.error("Invalid JWT", error);
    return null;
    }
}
export function getRoleFromToken(token){
    const payload=parseJwt(token);
    return payload?.role;
}
    */

export function parseJwt(token) {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1]; // ✅ split, NOT spilt
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Invalid JWT", error);
    return null;
  }
}

export function getRoleFromToken(token) {
  const payload = parseJwt(token);
  if (!payload) return null;

  let role = payload.role;

  if (role && role.startsWith("ROLE_")) {
    role = role.replace("ROLE_", "");
  }

  return role;
}
