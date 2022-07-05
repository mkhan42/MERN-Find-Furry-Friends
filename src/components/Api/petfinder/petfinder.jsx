
// export default async (req, res) => {
//   const params = new URLSearchParams();
//   params.append("grant_type", "client_credentials");
//   params.append("client_id", 'd6F0beQwYMff5In2on3e3IQKVBQlkTTGL5JYMnVic3SVASMSDe');
//   params.append("client_secret", 'KRuQ124lbaYv8NfQxz8ddEFOsZDjEjlQVWiS76EL');
//   const petfinderRes = await fetch(
//     "https://api.petfinder.com/v2/oauth2/token",
//     {
//       method: "POST",
//       body: params,
//     }
//   );
//   const data = await petfinderRes.json();
//   res.send(data);
// };