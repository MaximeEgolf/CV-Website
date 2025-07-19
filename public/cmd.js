const cmdInput = document.getElementById("cmdInput");

cmdInput.addEventListener('blur', () => {
  cmdInput.focus();
});

cmdInput.addEventListener('keydown', async (event) => {
  if (event.key === "Enter")
  {
    const cmdWords = cmdInput.value.split(' ');
    const cmdFirstWord = cmdWords[0];
    const cmdSecondWord = cmdWords[1];
    let verification = true;

    if (cmdWords.length > 2)
      verification = false;

    if (!verification || !(cmdFirstWord === "pwd" || cmdFirstWord === "cd"  || cmdFirstWord === "ls"))
      verification = false;

    if (verification)
    {
      const res = await fetch('http://localhost:3000/api/commandLine', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ command: cmdFirstWord,
                               argument: cmdSecondWord,
                               currentDir: window.location.pathname,
                            })
      });

      const resJson = await res.json();

      if (resJson.success)
      {
        switch (cmdFirstWord)
        {
          case "cd":
            window.location.href = resJson.result;
            break;

          case "ls":
            console.log(resJson.result);
            break;

          case "pwd":
            console.log(resJson.result);
            break;
        }
      }
    }
    cmdInput.value = '';
  }
});