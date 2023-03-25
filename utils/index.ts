import axios from "axios";
import jwt_decode from "jwt-decode";

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: { name: string; email: string; sub: string; picture: string } =
    jwt_decode(response.credential);

  const { name, picture, sub, email } = decoded;
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);
  await axios.post(`http://localhost:3000/api/auth`, user);
};
