/** @type {import('next').NextConfig} */
const nextConfig = {
    images:
    {
        unoptimized: true,
        remotePatterns:
            [
                {
                    protocol: "https",
                    hostname: "image.tmdb.org",
                    port: ""
                }
            ]
    }
};

export default nextConfig;
