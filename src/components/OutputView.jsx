
    import { Sandpack } from "@codesandbox/sandpack-react";


const stripCodeFences = (code = "") => {
    return code
        .replace(/^```[a-zA-Z]*\n?/m, "") // remove opening fence with optional language
        .replace(/```\s*$/m, "")           // remove closing fence
        .trim();
};

const OutputView = ({ generatedCode }) => {

    return <>
        <Sandpack
            template="react"
            files={{
                "/App.js": { code: stripCodeFences(generatedCode.jsx) },
                "/styles.css": { 
                    code: `@import url('https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css');\n${generatedCode.css || ''}`
                },
                "/index.html": {
                    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sandpack</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.4/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
                },
            }}
            customSetup={{
                dependencies: {
                "react": "18.2.0",
                "react-dom": "18.2.0"
                }
            }}
            options={{
                showTabs: true,
                showLineNumbers: true,
                wrapContent: true,
                externalResources: [
                    "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.4/dist/tailwind.min.css"
                ],
            }}
        />
    </>

};

export default OutputView;








