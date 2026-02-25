/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    // Prevent Next.js from bundling Prisma's native binaries.
    // Without this, the query engine gets a hashed module ID that can't
    // be resolved at runtime inside Docker/Nixpacks containers.
    serverExternalPackages: ["@prisma/client", "prisma"],
};

module.exports = nextConfig;
