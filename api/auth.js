import axios from "./axios";

export const HandleLogin = (username, password) =>
{
  new Promise((resolve, reject) => {
    axios
      .post(`/Users/Login`, { username: username, password: password })
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });
}

export const HandleSignUp = (username, email, password) =>
{
  new Promise((resolve, reject) => {
    axios
    .post(`/Users/SignUp`, { username: username, email: email, password: password })
    .then((response) => {
  
    //hacky, sorry
    alert('Sign Up successful!');
  
    resolve(response.data)
    })
    .catch((x) => {
    alert(x);
    reject(x);
    });
    });
}
