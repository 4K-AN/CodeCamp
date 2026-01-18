// Default markdown content with all required elements
const DEFAULT_MARKDOWN = `# Welcome to Markdown Previewer

## Introduction
This is a **Markdown Previewer** built with React and [Marked](https://marked.js.org/).

### Features
Here's what you can do:
- Preview markdown in real-time
- Supports all common markdown syntax
- Clean and responsive design

## Inline Code Example
You can use inline \`code\` like this: \`const x = 42;\`

## Code Block Example
\`\`\`javascript
function sayHello(name) {
    console.log(\`Hello, \${name}!\`);
}

sayHello("World");
\`\`\`

## Links and Images
Check out [FreeCodeCamp](https://freecodecamp.org) for more projects!

Here's an image example:
![FCC Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_primary.svg)

## Lists
### Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List
1. Step one
2. Step two
3. Step three

## Blockquote
> "The only way to do great work is to love what you do." — Steve Jobs

## Bold and Emphasis
This text is **bold**, this is *italic*, and this is ***both***.

---

Happy markdown previewing! 🎉`;

// React Component
const { useState } = React;

function MarkdownPreviewer() {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

    // Handle text area changes
    const handleEditorChange = (event) => {
        setMarkdown(event.target.value);
    };

    // Configure marked options
    marked.setOptions({
        breaks: true, // Convert line breaks to <br>
        gfm: true, // GitHub flavored markdown
    });

    // Render markdown to HTML
    const getPreviewHTML = () => {
        return { __html: marked.parse(markdown) };
    };

    return (
        <div className="container">
            <div className="section">
                <div className="section-title">📝 Editor</div>
                <textarea
                    id="editor"
                    value={markdown}
                    onChange={handleEditorChange}
                    placeholder="Enter your markdown here..."
                />
            </div>
            <div className="section">
                <div className="section-title">👁️ Preview</div>
                <div
                    id="preview"
                    dangerouslySetInnerHTML={getPreviewHTML()}
                />
            </div>
        </div>
    );
}

// Render the app
ReactDOM.render(<MarkdownPreviewer />, document.getElementById('root'));
