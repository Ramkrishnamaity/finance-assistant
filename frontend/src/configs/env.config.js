
// Simple env config - just export values from import.meta.env for use in src/
const envs = {
    node_env: import.meta.env.VITE_NODE_ENV,
    app: {
        port: import.meta.env.PORT,
        apiUrl: import.meta.env.VITE_API_URL,
    },
};

export default envs;
