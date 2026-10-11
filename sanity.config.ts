import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { media } from 'sanity-plugin-media';
import { createDeleteWithAssetsAction } from './sanity/actions/deleteWithAssets';
import { markdownSchema } from 'sanity-plugin-markdown';

export default defineConfig({
    name: 'templatelayer',
    title: 'TemplateLayer Studio',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ath1uvh6',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [structureTool(), visionTool(), media(), markdownSchema()],

    schema: {
        types: schemaTypes,
    },

    document: {
        actions: (prev, context) => {
            // Apply our custom delete action only to templates and blog posts
            // so we don't accidentally delete shared assets on standard documents
            const typesWithAssetDeletion = ['template', 'post', 'blogPost'];

            return prev.map((originalAction) => {
                // If it's the delete action and we're on a supported type
                if (originalAction.action === 'delete' && typesWithAssetDeletion.includes(context.schemaType)) {
                    return createDeleteWithAssetsAction(originalAction);
                }
                return originalAction;
            });
        },
    },
});
