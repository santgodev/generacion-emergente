const isProd = process.env.NODE_ENV === 'production';
const repoName = 'generacion-emergente';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: isProd ? `/${repoName}` : '',
    assetPrefix: isProd ? `/${repoName}/` : '',
}

module.exports = nextConfig
