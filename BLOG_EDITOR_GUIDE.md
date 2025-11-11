# Blog Editor Guide

## Overview
The blog editor is a comprehensive Ghost-like content management system with rich text editing, SEO optimization, and markdown/HTML support.

## Features

### Rich Text Editor
The editor includes a full-featured toolbar with:

#### Text Formatting
- **Bold** (Ctrl+B) - Make text bold
- *Italic* (Ctrl+I) - Make text italic
- <u>Underline</u> (Ctrl+U) - Underline text
- ~~Strikethrough~~ - Strike through text
- ==Highlight== - Highlight text with yellow background

#### Headings
- **H2** - Main section headings
- **H3** - Subsection headings

#### Lists & Quotes
- **Bullet List** - Unordered lists
- **Numbered List** - Ordered lists
- **Quote** - Block quotes for citations
- **Code Block** - Syntax-highlighted code blocks
- **Inline Code** - Inline code snippets

#### Text Alignment
- **Align Left** - Left align text
- **Align Center** - Center align text
- **Align Right** - Right align text
- **Justify** - Justify text

#### Media
- **Insert Image** - Add images with URL and alt text (for SEO)
- **Insert Link** - Add hyperlinks with custom text

#### History
- **Undo** (Ctrl+Z) - Undo last action
- **Redo** (Ctrl+Y) - Redo last action

### Content Tab
- **Post Title** - Main title (required, used for SEO if no meta title set)
- **URL Slug** - Auto-generated from title, customizable (required)
- **Excerpt** - Short summary (optional, used for meta description if not set)
- **Featured Image URL** - Header image for the post (optional)
- **Post Content** - Rich text editor (required)

### SEO & Meta Tab
Optimize your content for search engines:

#### SEO Title
- Override the post title for search results
- Recommended: 50-60 characters
- Character counter included
- Falls back to post title if not set

#### Meta Description
- Compelling description for search results
- Recommended: 150-160 characters
- Character counter included
- Falls back to excerpt if not set

#### Tags
- Comma-separated tags for categorization
- Example: `restoration, farmall, vintage, tractor`
- Helps organize content
- Displayed on blog post pages

#### SEO Preview
- Real-time preview of how your post appears in Google search results
- Shows title, URL, and description as they would appear

### Preview Tab
See exactly how your post will look to readers:
- Featured image display
- Full post title
- Excerpt (if provided)
- Rendered HTML content
- Tags display

### Publishing Options
- **Save as Draft** - Save without publishing (uncheck "Publish immediately")
- **Publish** - Make post live on the website
- **Update & Publish** - Update existing published post
- **Save Changes** - Update existing draft

## HTML & Markdown Support

### HTML
The editor stores content as HTML. You can:
- Use the visual editor to generate clean HTML
- Images, links, and formatting are all HTML-based
- Content is sanitized for security

### Code Blocks
Code blocks support syntax highlighting for:
- JavaScript, TypeScript
- Python
- HTML, CSS
- And many more languages

Simply use the "Code Block" button and paste your code.

## SEO Best Practices

### Title Optimization
- Keep titles between 50-60 characters
- Include primary keyword
- Make it compelling and clickable
- Use title case

### Description Optimization
- Write 150-160 characters
- Include a call-to-action
- Mention key benefits
- Include primary keyword naturally

### Image Optimization
- Always add alt text to images
- Use descriptive filenames
- Optimize image file sizes before uploading
- Use featured images (1200x630px recommended)

### Content Structure
- Use headings (H2, H3) to organize content
- Break up text with images and lists
- Keep paragraphs short and scannable
- Use bold for important points

### URL Slugs
- Keep slugs short and descriptive
- Use hyphens to separate words
- Include primary keyword
- Avoid special characters

## Keyboard Shortcuts
- `Ctrl+B` - Bold
- `Ctrl+I` - Italic
- `Ctrl+U` - Underline
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo

## Tips
1. **Write First, Format Later** - Focus on content, then use toolbar to format
2. **Use SEO Preview** - Always check how your post looks in search results
3. **Add Alt Text** - Every image should have descriptive alt text for SEO and accessibility
4. **Preview Before Publishing** - Use the Preview tab to check final appearance
5. **Save Drafts** - Use draft mode while working, publish when ready

## Content Display
Published posts automatically show:
- Featured image (if provided)
- Title with proper heading structure
- Excerpt for better introduction
- Formatted content with proper typography
- Publication and update dates
- Tags with styling
- Proper meta tags for social sharing

## Ghost-like Features
This editor matches Ghost's capabilities:
- ✅ Rich text editing
- ✅ HTML/Markdown support
- ✅ Image insertion
- ✅ Code blocks with syntax highlighting
- ✅ SEO optimization
- ✅ Meta tags management
- ✅ Featured images
- ✅ Excerpts
- ✅ Tags
- ✅ Draft/Publish workflow
- ✅ Real-time preview
- ✅ Character counters
- ✅ URL slug management
