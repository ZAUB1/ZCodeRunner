$(() => {
    const runbtn = document.getElementById("runbtn");
    const editor = ace.edit("editor");
    const linecounter = document.getElementById("linecounter");
    const closebtn = document.getElementById("close");
    const empty = document.getElementById("empty");
    const iconlanguage = document.getElementById("iconlanguage");
    const languagename = document.getElementById("languagename");

    var code = editor.getValue();

    var current = "JS";

    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    editor.setPrintMarginColumn(900);
    editor.setShowInvisibles(true);

    editor.setOptions({
        fontFamily: "Fira Code",
    });

    editor.on("change", () => {
        code = editor.getValue();

        linecounter.innerHTML = "Lines : " + (code.split(/\r\n|\r|\n/).length || 0);
    });

    runbtn.addEventListener("click", () => {
        if (current == "JS")
            fetch("http://zcoderunner/run:handle", { "method": "POST", "body": JSON.stringify({code: code}) });
        else
            fetch("http://zcoderunner/run:handlelua", { "method": "POST", "body": JSON.stringify({code: code}) });
    });

    closebtn.addEventListener("click", () => {
        document.body.style.opacity = 0;
        fetch("http://zcoderunner/run:close", { "method": "POST", "body": "{}" });
    });

    empty.addEventListener("click", () => {
        document.body.style.opacity = 0;
        fetch("http://zcoderunner/run:close", { "method": "POST", "body": "{}" });
    });

    iconlanguage.addEventListener("click", () => {
        if (current == "JS")
        {
            current = "LUA";
            editor.session.setMode("ace/mode/lua");
            iconlanguage.style.left = "27.5%";
        }
        else
        {
            current = "JS";
            editor.session.setMode("ace/mode/javascript");
            iconlanguage.style.left = "20%";
        }

        languagename.innerHTML = current;
    });

    window.addEventListener("message", (event) => {
        if (event.data.show)
        {
            document.body.style.opacity = 1;
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.which == 117)
        {
            document.body.style.opacity = 0;
            fetch("http://zcoderunner/run:close", { "method": "POST", "body": "{}" });
        }
    })
});