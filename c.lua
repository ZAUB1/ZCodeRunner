RegisterNUICallback("run:handlelua", function(data)
    local code, err = load(data.code, '@zcoderunner')

    if err then
        print(err)
        return
    end

    local status, result = pcall(code)
    if result then
        print(result)
    end

    return
end)