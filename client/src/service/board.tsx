export const getBoardsAsync = async () => {
    const response = await fetch('/boards');

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const createBoardAsync = async (form: object, token: object) => {
    const response = await fetch('/board-create', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorised: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

export const deleteBoardAsync = async (id: string) => {
    const response = await fetch(`/board-delete/${id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });

    if(response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};
