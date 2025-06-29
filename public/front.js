async function gitHubApiCall(user) {
  try {
    const res = await fetch('http://localhost:3000/api/github');
    const resJson  = await res.json();

    // Here we take the json and use it to make HTML
    console.log('Frontend json');
    console.log(resJson);
  }
  catch (error) {
    console.log(error);
  }
}

gitHubApiCall('MaximeEgolf');
