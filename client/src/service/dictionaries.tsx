export const boardIcons = async () => {
    const response = await fetch('/dictionaries/board-icons');

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const boardProfessions = async () => {
    const response = await fetch('/dictionaries/board-professions');

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const boardTribes = async () => {
    const response = await fetch('/dictionaries/board-tribes');

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};
