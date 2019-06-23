RegisterNuiCallbackType("run:handle");
on("__cfx_nui:run:handle", (data) => {
    const code = data.code;

    eval(code);
});