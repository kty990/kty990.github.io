const flyingInfo = document.getElementById("flight-info");

const infos = [
    {
        title: "First Post",
        desc: "Getting ready for the PSTAR exam. For those that don't know, the PSTAR exam is the 'student pilot' exam, similar to the learners permit for driving.<br><br> 05-15-2024",
        tags: ['Student Pilot', 'Exam', 'PSTAR']
    }
]

for (let x of infos) {
    let div = document.createElement("div");
    div.classList.add("info");
    let p0 = document.createElement("p");
    p0.id = 'title';
    p0.textContent = x.title;
    let p1 = document.createElement("p");
    p1.id = 'description';
    p1.innerHTML = x.desc.replace("\n", "<br>");
    let p2 = document.createElement("p");
    p2.id = 'tags';
    p2.textContent = x.tags.join("\u2800\u2800\u2800|\u2800\u2800\u2800");
    div.appendChild(p0);
    div.appendChild(p1);
    div.appendChild(p2);
    flyingInfo.appendChild(div);
}