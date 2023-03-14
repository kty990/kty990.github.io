let preventPHP = true;

if (preventPHP) {
    document.getElementById("conForm").action = "";
    document.getElementById("submit").addEventListener("mousedown", () => {
        alert("Unable to redirect. PHP not supported on current hosting server 'github pages'");
    })
}