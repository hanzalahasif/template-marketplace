import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'Short summary shown on blog listing cards',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'contentFormat',
            title: 'Content Format',
            type: 'string',
            description: 'Choose whether to write using the Block Editor (Rich Text) or Markdown',
            options: {
                list: [
                    { title: 'Block Editor (Rich Text)', value: 'blocks' },
                    { title: 'Markdown', value: 'markdown' },
                ],
                layout: 'radio',
            },
            initialValue: 'blocks',
        }),
        defineField({
            name: 'body',
            title: 'Body (Rich Text)',
            type: 'array',
            hidden: ({ document }) => document?.contentFormat === 'markdown',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    defineField({
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                    }),
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'bodyMarkdown',
            title: 'Body (Markdown)',
            type: 'markdown',
            description: 'Write or paste your Markdown content here. Supports headings, bold/italic, lists, tables, code blocks, links, and image uploads.',
            hidden: ({ document }) => document?.contentFormat !== 'markdown',
        }),
        defineField({
            name: 'thumbnail',
            title: 'Featured Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
            description: 'e.g. "8 min read"',
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Override the page title for search engines',
            group: 'seo',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 2,
            description: 'Override the meta description for search engines',
            group: 'seo',
        }),
    ],
    groups: [
        { name: 'seo', title: 'SEO' },
    ],
    orderings: [
        { title: 'Published Date', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'thumbnail',
            date: 'publishedAt',
        },
        prepare({ title, author, media, date }) {
            const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date';
            return {
                title,
                subtitle: `${author || 'No author'} · ${formattedDate}`,
                media,
            };
        },
    },
});
