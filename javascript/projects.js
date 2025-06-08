// Variables
const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]

// Fonctions
async function getUserGithubRepos(username){
  try
  {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
    const userRepos = await response.json();
    return userRepos;
  }

  catch(error)
  {
    throw new Error("User wasn't found");
  }
}

async function createGitHubHTML(username){
  const userRepos = await getUserGithubRepos(`${username}`);
  const projetdiv = document.getElementById('mainContent')

  userRepos.forEach(element => {
    let date = new Date(element.pushed_at);
    let day = date.getDate().toString();
    let month =  date.getMonth().toString();
    let year = date.getFullYear().toString();

    let description = element.description === null ? "(Ce répositoire ne contient pas de description)": element.description;

    console.log(description);

    projetdiv.innerHTML += `<div class="mainContentSection">
                              <div class="mainContentSectionHeader">
                                <a href=${element.html_url} target="_blank">${element.name}</a>
                                <i>Derniers changements: ${day} ${months[month]} ${year}</i>
                              </div>
                              <hr>
                              <p>${description}</p>
                            </div>`;
  });

  console.log(userRepos);
}

createGitHubHTML('MaximeEgolf');