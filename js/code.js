class Explorer {
    constructor() {
        // Get all files in directory and give appropriate indent levels
    }
}

class File {
    constructor(filename, indent_level) {
        fetch(`../code/${filename}`)
        .then(response => response.text())
        .then(text => {
            this.text = text;
        })
        this.indent_level = indent_level;
    }
}