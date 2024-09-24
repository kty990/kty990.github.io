async function init() {
    let navbar = `<nav>
    <ul>
        <li><a href="./home">Home</a></li>
        <li><a href="./about">About</a></li>
        <li><a href="./flying">Flying</a></li>
        <li><a href="./projects">Projects</a></li>
        <li><a href="./stories">Stories</a></li>
        <li><a href="./timesheet">Timesheet</a></li>
    </ul>
</nav>`
    document.body.innerHTML += navbar;
}

init();