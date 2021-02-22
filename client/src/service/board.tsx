export const getBoardsAsync = async (accessToken: string) => {
    const response = await fetch('/boards', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const createBoardAsync = async (form: object, accessToken: string) => {
    const response = await fetch('/board-create', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(form),
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const deleteBoardAsync = async (id: string, accessToken: string) => {
    const response = await fetch(`/board-delete/${id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};
