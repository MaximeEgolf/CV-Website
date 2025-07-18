const cmd = document.getElementById("cmdInput");

cmd.addEventListener('blur', () => {
  cmd.focus();
});

// Et si j'utilisais ça à la place de mettre un <form> en html ?
// Ça permettrait de faire une première vérification (moins de call à l'API)

// cmd.addEventListener('keydown', async (event) => {
//   if (event.key === "Enter")
//   {
//     // if (cmd.value.length && cmd.value.startsWith("cd"))
//     // {
//       try {
//         console.log(cmd.value);
//         const cdRes = await fetch('http://localhost:3000/api/cd', {
//           method: 'POST',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({ value: cmd.value })
//         });

//         // const cdResJson  = await cdRes.json();
//         // if (cdResJson.from != '/api/cd')
//         //   throw new Error(`Called api ${cdResJson.from} instead of /api/cd`);
//       }
//       catch (error)
//       {
//         console.error(error);
//       }
//     // }
//     cmd.value = '';
//   }
// });