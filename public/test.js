const button = document.getElementById("testButton");

button.onclick = () => {
  fetch('http://localhost:3000/api/hello')
      .then(response => response.json())
      .then(data => {
        console.log("response good");
          document.getElementById('result').innerHTML =
              '<p>' + data.message + '</p>';
      })
      .catch(error => {
        console.log("error");
          document.getElementById('result').innerHTML =
              '<p>' + error + '</p>';
      });
}