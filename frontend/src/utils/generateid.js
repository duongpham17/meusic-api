const randomID = () => Math.random().toString(36).substring(7);

export const generateid = (times = 2) => {
    const id = Array.from({length: times}, () => randomID()).join("");

    return id
}