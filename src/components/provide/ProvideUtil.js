
export const toTypeLabel = (type) => {
    let typeLabel;
    switch (type) {
        case "service": typeLabel = "Service"; break;
        case "data": typeLabel = "Data"; break;
        case "node": typeLabel = "Node"; break;
        default: typeLabel = "Service/Data/Node"
    }
    return typeLabel;
}