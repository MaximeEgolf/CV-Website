const test = document.getElementById('test');

async function gitHubApiCall() {
  try {
    const githubRes = await fetch('http://localhost:3000/api/github');
    const githubResJson  = await githubRes.json();

    if (githubResJson.from != '/api/github')
      throw new Error(`Called api ${githubResJson.from} instead of /api/github`);

    const value = githubResJson.value;

    for (const key in value) {
      test.innerHTML += `<div class="mainContentSection">
                          <h1>${value[key].name}</h1>
                         </div>`;
    }
  }
  catch (error) {
    throw new Error(error);
  }
}

gitHubApiCall();