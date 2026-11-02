import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Sanity webhook -> instant on-demand revalidation.
// Sanity calls this URL on blogPost/template create/update/delete.
// Secret check: ?secret=... query param OR Authorization: Bearer <secret> header.
// Secret value lives in Vercel env var SANITY_REVALIDATE_SECRET (see setup steps below).

function isAuthorized(request: NextRequest): boolean {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
        console.error('[revalidate] SANITY_REVALIDATE_SECRET is not set in env vars');
        return false;
    }
    const provided =
        request.nextUrl.searchParams.get('secret') ||
        request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
        '';
    if (!provided || provided.length !== secret.length) return false;
    try {
        return timingSafeEqual(Buffer.from(provided), Buffer.from(secret));
    } catch {
        return false;
    }
}

function pathsForDocument(doc: Record<string, unknown>): string[] {
    const type = doc._type as string | undefined;
    const slug = (doc.slug as { current?: string } | undefined)?.current;
    const paths: string[] = [];

    if (type === 'blogPost' && slug) {
        paths.push(`/blog/${slug}`, '/blog', '/');
    } else if (type === 'template' && slug) {
        paths.push(`/templates/${slug}`, '/templates', '/free-templates', '/');
    } else {
        // Unknown type, delete event, or missing slug — purge the listings.
        paths.push('/', '/blog', '/templates', '/free-templates');
    }
    return paths;
}

export async function POST(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: Record<string, unknown> = {};
    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        // Empty body — fall through to listing purge below.
    }
    // Sanity sometimes nests the document under `document`.
    const doc = (body.document as Record<string, unknown> | undefined) || body;

    // Manual override: POST {"path": "/blog/some-slug"} revalidates exactly that path.
    const manualPath = typeof body.path === 'string' ? body.path : null;
    const paths = manualPath ? [manualPath] : pathsForDocument(doc);

    for (const p of paths) {
        revalidatePath(p);
    }
    console.log('[revalidate] Revalidated:', paths.join(', '));
    return NextResponse.json({ revalidated: true, paths });
}

// GET is the manual/test trigger: /api/revalidate?secret=...&path=/blog/some-slug
export async function GET(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const path = request.nextUrl.searchParams.get('path');
    const paths = path ? [path] : ['/', '/blog', '/templates', '/free-templates'];
    for (const p of paths) {
        revalidatePath(p);
    }
    console.log('[revalidate] Manual revalidate:', paths.join(', '));
    return NextResponse.json({ revalidated: true, paths });
}
