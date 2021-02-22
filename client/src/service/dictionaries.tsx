export const boardIconsAsync = async (accessToken: string) => {
    const response = await fetch('/dictionaries/board-icons', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const boardProfessionsAsync = async (accessToken: string) => {
    const response = await fetch('/dictionaries/board-professions', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const boardTribesAsync = async (accessToken: string) => {
    const response = await fetch('/dictionaries/board-tribes', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};
