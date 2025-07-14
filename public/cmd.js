const cmd = document.getElementById("cmdInput");

cmd.addEventListener('blur', () => {
  cmd.focus();
});

cmd.addEventListener('keydown', async (event) => {
  if (event.key === "Enter")
  {
    if (cmd.value.length && cmd.value.startsWith("cd"))
    {
      try {
        const cdRes = await fetch('http://localhost:3000/api/cd', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(cmd.value)
        });

        const cdResJson  = await cdRes.json();
        if (cdResJson.from != '/api/cd')
          throw new Error(`Called api ${cdResJson.from} instead of /api/cd`);
      }
      catch (error)
      {
        console.error(error);
      }
    }
    cmd.value = '';
  }
});