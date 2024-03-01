/** @type {import('next').NextConfig} */
const nextConfig = {
    images:
    {
        disableStaticImages: true,
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
