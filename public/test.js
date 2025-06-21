const button = document.getElementById("testButton");

button.onclick = () => {
  fetch('http://localhost:3000/api/hello')
      .then(response => response.json())
      .then(data => {
          document.getElementById('result').innerHTML =
              '<p>Response: ' + data.message + '</p>';
      })
      .catch(error => {
          document.getElementById('result').innerHTML =
              '<p>Error: ' + error + '</p>';
      });
}