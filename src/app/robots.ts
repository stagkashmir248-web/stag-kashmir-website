import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/dashboard/',
                    '/checkout/',
                    '/cart',
                    '/signin',
                    '/login',
                ],
            },
        ],
        sitemap: 'https://stagkashmir.com/sitemap.xml',
    };
}
