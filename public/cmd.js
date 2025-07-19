const cmd = document.getElementById("cmdInput");

cmd.addEventListener('blur', () => {
  cmd.focus();
});

cmd.addEventListener('keydown', async (event) => {
  if (event.key === "Enter")
  {
    console.log(window.location.pathname);
    console.log(cmd.value);

    const res = await fetch('http://localhost:3000/api/commandLine', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ from: window.location.pathname, to: cmd.value})
    });

    const resJson = await res.json();

    if (resJson.valid)
      window.location.href = resJson.path;

    cmd.value = '';
  }
});