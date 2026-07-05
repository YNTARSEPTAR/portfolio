const messages = [

"Documentation exists. Nobody reads it.",

"Everything works. Suspicious.",

"There is no bug. Only undocumented behavior.",

"Keyboard not found. Press F1 to continue.",

"Segmentation fault builds character.",

"Works on my machine.",

"Root access is a privilege, not a right.",

"Coffee levels below operational limits.",

"Curiosity is encouraged. Unauthorized access isn't.",

"Today's feature is tomorrow's legacy code.",

"Remember: Backup before bravery."

];

function updateClock(){

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleString();

}

setInterval(updateClock,1000);

updateClock();

const random =
messages[Math.floor(Math.random()*messages.length)];

document.getElementById("motd").textContent=random;