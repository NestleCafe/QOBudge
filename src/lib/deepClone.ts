function deepClone<Arg>(data: Arg): Arg{
    return JSON.parse(JSON.stringify(data));
}

export default deepClone;