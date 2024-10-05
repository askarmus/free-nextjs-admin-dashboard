/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        connectionString: "mongodb+srv://askar:6XhLvkjOBeOTifRO@serverlessinstance0.aviofoc.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0",
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

export default nextConfig;
