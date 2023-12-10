import{p as c}from"./component-library_-bc3f81a2.js";import{u as s,j as n}from"./ssg-client-b0099665.js";const r=`import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react' // you can also use @vitejs/plugin-react-swc
import pages, { DefaultPageStrategy } from 'vite-plugin-react-pages'

export default defineConfig({
  plugins: [
    react(),
    pages({
      pagesDir: path.join(__dirname, 'pages'),
      pageStrategy: new DefaultPageStrategy({
        extraFindPages: async (pagesDir, helpers) => {
          const srcPath = path.join(__dirname, '../src')
          if (String(({}).SHOW_ALL_COMPONENT_DEMOS) === 'true') {
            // show all component demos during dev
            // put them in page \`/components/demos/\${componentName}\`
            helpers.watchFiles(
              srcPath,
              '*/demos/**/*.{[tj]sx,md?(x)}',
              async function fileHandler(file, api) {
                const { relative, path: absolute } = file
                const match = relative.match(
                  /(.*)\\/demos\\/(.*)\\.([tj]sx|mdx?)$/
                )
                if (!match) throw new Error('unexpected file: ' + absolute)
                const [_, componentName, demoName] = match
                const pageId = \`/components/demos/\${componentName}\`
                // register page data
                api.addPageData({
                  pageId,
                  key: demoName,
                  // register demo runtime data path
                  // the ?demo query will wrap the module with useful demoInfo
                  // that will be consumed by theme-doc
                  dataPath: \`\${absolute}?demo\`,
                  // register demo static data
                  staticData: await helpers.extractStaticData(file),
                })
              }
            )
          }

          // find all component README
          helpers.watchFiles(
            srcPath,
            '*/README.md?(x)',
            async function fileHandler(file, api) {
              const { relative, path: absolute } = file
              const match = relative.match(/(.*)\\/README\\.mdx?$/)
              if (!match) throw new Error('unexpected file: ' + absolute)
              const [_, componentName] = match
              const pageId = \`/components/\${componentName}\`
              // register page data
              api.addPageData({
                pageId,
                // register demo runtime data path
                dataPath: absolute,
                // register demo static data
                staticData: await helpers.extractStaticData(file),
              })
            }
          )
        },
      }),
    }),
  ],
  resolve: {
    alias: {
      'my-lib': path.join(__dirname, '../src'),
    },
  },
})
`;function a(t){const e=Object.assign({h1:"h1",p:"p",pre:"pre",code:"code",strong:"strong",a:"a",h2:"h2",blockquote:"blockquote"},s(),t.components),{FileText:o}=e;return o||d("FileText",!0),n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"example-develop-a-component-library",children:"Example: develop a component library"}),`
`,n.jsx(e.p,{children:'This is an example of using "Advanced Filesystem Routing" inside a component library project.'}),`
`,n.jsx(e.p,{children:"Suppose you are developing a React component library. Your project have file structure like this:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-text",children:`src
├── Button
│   ├── demos
│   │   ├── demo1.tsx
│   │   └── demo2.tsx
│   ├── index.tsx
│   ├── style.module.css
│   └── README.md
├── Card
│   ├── demos
│   │   ├── demo1.tsx
│   │   └── demo2.tsx
│   ├── index.tsx
│   ├── style.module.css
│   └── README.md
└── index.ts
`})}),`
`,n.jsxs(e.p,{children:["You want to use vite as your local demo development environment (because it is blazingly fast). ",n.jsx(e.strong,{children:"How to collect all components and all demos from this project?"})," The file structure doesn't follow the ",n.jsx(e.a,{href:"/fs-routing",children:"Basic Filesystem Routing Convention"}),"."]}),`
`,n.jsx(e.p,{children:"The answer: implement your own filesystem routing convention!"}),`
`,n.jsx(e.p,{children:"vite.config.ts:"}),`
`,n.jsx(o,{text:r,syntax:"ts"}),`
`,n.jsxs(e.p,{children:["We use ",n.jsx(e.code,{children:"api.getRuntimeData(pageId)"})," and ",n.jsx(e.code,{children:"api.getStaticData(pageId)"})," inside fileHandlers to get the pageData object. We can mutate the data object, and vite-pages will update its pages accordingly."]}),`
`,n.jsxs(e.p,{children:["Checkout the complete example in ",n.jsx(e.a,{href:"https://github.com/vitejs/vite-plugin-react-pages/blob/main/packages/create-project/template-lib/docs/vite.config.ts",children:"the library project scaffold"}),`.
You can initialize this project `,n.jsx(e.a,{href:"/",children:"with one command"})," (choose ",n.jsx(e.code,{children:"lib"})," template)."]}),`
`,n.jsx(e.h2,{id:"monorepo",children:"Monorepo"}),`
`,n.jsx(e.p,{children:"In some cases, we want to publish each component in their own packages."}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:"Monorepo has more advantages when components are complex and tend to evolve independently. If we use a single package to publish all these components like the above example, all components share a version number. If we need to introduce a breaking change in a component, we have to bump the major version of the whole package. But with the monorepo we only need to bump the major version of that sub-package. Users will be more confident to upgrade."}),`
`]}),`
`,n.jsx(e.p,{children:"In that case, we create a seperate package to run vite-pages, collecting all components and their demos. The project setup will look like this:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-text",children:`packages
├── Button
│   ├── demos
│   │   ├── demo1.tsx
│   │   └── demo2.tsx
│   ├── src
│   │   ├── index.tsx
│   │   └── style.module.css
│   ├── package.json
│   └── README.md
├── Card
│   ├── demos
│   │   ├── demo1.tsx
│   │   └── demo2.tsx
│   ├── src
│   │   ├── index.tsx
│   │   └── style.module.css
│   ├── package.json
│   └── README.md
├── demos
│   ├── pages
│   │   ├── index$.tsx
│   │   └── _theme.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── package.json
`})}),`
`,n.jsxs(e.p,{children:["Checkout the complete example in ",n.jsx(e.a,{href:"https://github.com/vitejs/vite-plugin-react-pages/blob/main/packages/create-project/template-lib-monorepo/packages/demos/vite.config.ts",children:"the lib-monorepo scaffold"}),`.
You can initialize this project `,n.jsx(e.a,{href:"/",children:"with one command"})," (choose ",n.jsx(e.code,{children:"lib-monorepo"})," template)."]})]})}function l(t={}){const{wrapper:e}=Object.assign({},s(),t.components);return e?n.jsx(e,Object.assign({},t,{children:n.jsx(a,t)})):a(t)}function d(t,e){throw new Error("Expected "+(e?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}const p=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"})),i={};i.outlineInfo=c;i.main=p;export{i as default};
