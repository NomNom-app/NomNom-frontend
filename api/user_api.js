import axios from "./axios";

export const HandleLogin = (username, password) =>
  new Promise((resolve, reject) => {
    axios
      .post(
        `/session`,
        { username: username, password: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });

export const HandleSignUp = (username, email, password) =>
{


  console.log(axios.getUri());

  axios
  .post('/Users/SignUp', { username: username, email: email, password: password })
  .then(response => {console.log(response);})
  .catch((x) => {

    console.log(x);
    console.log(x.data);
    
  });
};
