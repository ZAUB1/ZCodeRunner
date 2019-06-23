RegisterNuiCallbackType("run:handle");
on("__cfx_nui:run:handle", (data) => {
    const code = data.code;

    const res = eval(code);

    if (res)
        console.log(res);
});

RegisterNuiCallbackType("run:close");
on("__cfx_nui:run:close", (data) => {
    SetNuiFocus(false, false);
});

setTick(() => {
    if (IsControlJustPressed(1, 167))
    {
        SendNuiMessage(JSON.stringify({show: true}));
        SetNuiFocus(true, true);
    }
});