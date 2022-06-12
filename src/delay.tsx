const delay = async (waitDurationMs = 1000): Promise<boolean> => {
    return new Promise(resolve => setTimeout(resolve, waitDurationMs));
};

export default delay;