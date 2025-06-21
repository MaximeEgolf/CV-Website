// // Variables
// const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]

// // Fonctions
// async function getUserGithubRepos(user){
//   try
//   {
//     const response = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&direction=desc`);
//     const userRepos = await response.json();
//     return userRepos;
//   }

//   catch(error)
//   {
//     throw new Error("User wasn't found");
//   }
// }

// // TODO: Ajouter les 5 langages de programmation les plus utilisés.
// async function getProgrammingLanguageGitHubRepo(user, userRepo){
//   try
//   {
//     const response = await fetch(`https://api.github.com/repos/${user}/${userRepo}/languages`);
//     const repoProgrammingLanguage = await response.json();
//     return repoProgrammingLanguage;
//   }

//   catch(error)
//   {
//     throw new Error("Couldn't get the programming languages form the repo.");
//   }
// }

// async function createGitHubHTML(user){
//   const projetdiv = document.getElementById('main')
//   const userRepos = await getUserGithubRepos(user);

//   userRepos.forEach(element => {
//     let date = new Date(element.pushed_at);
//     let description = element.description === null ?
//                       "À implémenter dans GitHub" : element.description;

//     projetdiv.innerHTML += `<div class="mainContentSection">
//                               <div class="mainContentSectionHeader">
//                                 <a href=${element.html_url} target="_blank">${element.name}</a>
//                                 <i>Derniers changements: ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</i>
//                               </div>
//                               <hr>
//                               <p>${description}</p>
//                             </div>`;

//   });
// }

// createGitHubHTML('MaximeEgolf');