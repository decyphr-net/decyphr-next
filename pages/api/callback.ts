import auth0 from "../../utils/auth/auth0";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: "/en/dashboard/" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
