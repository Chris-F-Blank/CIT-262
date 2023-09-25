const newP = document.createElement("p");
newP.textContent = "My new paragraph";
newP.classList.add("green");
document.body.append(newP); 

const newSection = document.createElement('section');
// const newHeadline = document.createElement('h2');
// newSection.append(newHeadline);
const coursecode = "CSE121B"
newSection.innerHTML = `<h2>${coursecode}</h2>
<p>Javascript Language</p>`;

document.body.append(newSection);