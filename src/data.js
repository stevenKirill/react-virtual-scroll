const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const generateData = () => {
    return Array.from({ length: 10000 },(_,idx) => {
        return {
            name: 'kirill',
            number: idx + 1,
            job: 'front end developer',
            hobby: 'gym',
            id: generateId(),
        };
    });
};