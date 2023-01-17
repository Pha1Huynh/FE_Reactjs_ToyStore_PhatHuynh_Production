let getToken = () => {
  let token = JSON.parse(localStorage.getItem('persist:auth'))
    ? JSON.parse(localStorage.getItem('persist:auth'))
    : null;
  if (token) {
    token = JSON.parse(token.auth);
    return token.tokens;
  } else return null;
};
let addToken = (tokens) => {
  localStorage.setItem('persist:auth', JSON.stringify(tokens));
};
let deleteToken = () => {
  localStorage.removeItem('persist:auth');
};
export { getToken, deleteToken, addToken };
