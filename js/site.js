async function init() {
    let active = window.location.href.split("/");
    active = active[active.length - 1];
    console.log(active);
    let navbar = `<nav>
    <ul>
        <li><a href="./home" ${(active.indexOf('home') != -1) ? 'id="active"' : ''}>Home</a></li>
        <li><a href="./about" ${(active.indexOf('about') != -1) ? 'id="active"' : ''}>About <span style="font-size:0.75vh">WIP</span></a></li>
        <li><a href="./flying" ${(active.indexOf('flying') != -1) ? 'id="active"' : ''}>Flying <span style="font-size:0.75vh">WIP</span></a></li>
        <li><a href="./projects" ${(active.indexOf('projects') != -1) ? 'id="active"' : ''}>Projects <span style="font-size:0.75vh">WIP</span></a></li>
        <li><a href="./stories" ${(active.indexOf('stories') != -1) ? 'id="active"' : ''}>Stories <span style="font-size:0.75vh">WIP</span></a></li>
        <li><a href="./timesheet" ${(active.indexOf('timesheet') != -1) ? 'id="active"' : ''}>Timesheet <span style="font-size:0.75vh">WIP</span></a></li>
    </ul>
</nav>`
    document.body.innerHTML += navbar;


}

init();