$(() => {
    const runbtn = document.getElementById("runbtn");
    const editor = ace.edit("editor");
    const linecounter = document.getElementById("linecounter");

    var code = editor.getValue();

    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    editor.setPrintMarginColumn(900);
    editor.setShowInvisibles(true);

    editor.on("change", () => {
        code = editor.getValue();

        linecounter.innerHTML = "Lines : " + (code.split(/\r\n|\r|\n/).length || 0);
    });

    runbtn.addEventListener("click", () => {
        fetch("http://zrunner/run:handle", { "method": "POST", "body": JSON.stringify({code: code}) });
    });
});