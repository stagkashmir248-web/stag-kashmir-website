/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    // Disable Turbopack for production builds.
    // Turbopack in Next.js 16 doesn't correctly honor serverExternalPackages
    // for Prisma's native binaries — it bundles them with hashed IDs that
    // can't be resolved at runtime inside Docker/Nixpacks containers.
    // Webpack handles serverExternalPackages correctly.
    turbopack: false,
    serverExternalPackages: ["@prisma/client", "prisma"],
};

module.exports = nextConfig;
