
// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     document.querySelector(".auth-wrapper")
//       .addEventListener("DOMNodeInserted", d => {
//         d.target.querySelector("form")
//           .addEventListener('submit', e => {
//             e.preventDefault();
//             var formData = new FormData(e.srcElement);
//             const username = formData.get("username");
//             const password = formData.get("password");
//             setAuthenticationToken(username, password);
//           });
//       })
//   },10)
// });




async function setAuthenticationToken(username, password) {
  const host = window.location.host; 

  const token = await fetch(`${window.location.protocol}/authentication/authenticate`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).then(response => response.json())

  console.log(token, username, password, host);
  
}