/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // Prevent Next.js/Turbopack from bundling Prisma's native binaries.
    // Turbopack bundles them with hashed IDs that can't be resolved in Docker.
    // serverExternalPackages tells it to resolve from node_modules at runtime.
    serverExternalPackages: ["@prisma/client", "prisma"],
};

module.exports = nextConfig;
