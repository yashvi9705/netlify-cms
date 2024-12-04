---
layout: layouts/default.hbs
---

# LAB 1 Deliverable
---

## Three different template engines
---

### Markdown

- Markdown is a lightweight markup language that can be used to add formatting elements to plain text documents.

#### Pros and Cons 
- Markdown is portable, platform independent and easy to learn.

- Different platforms have slight variations on how they interpret the Markdown syntax which leads to issues in rendering. 

--- 
### Embedded JavaScript (EJS)

- EJS is a simple templating language that lets you generate HTML markup with plain javascript.

#### Pros and Cons
- EJS uses plain JavaScript tp compile templates which results in highly optimized and fast code execution. it is also similar to JSP nad PHP which makes learning it a bit easier.
 
- It can get a bit complicated as mixing HTML and Javascript can lead to harder to read template.
- EJS is a basic templating engine so it has limited features and we might need additional HTML and JavaScript code to achieve some tasks.


--- 
## Nunjucks

- Nunjucks is a templating engine for JavaScript which is commonly used with Node.js server for rendering server side rendering.

#### Pros and Cons
- Nunjucks has familiar syntax to other popular templating engines which makes it easy to learn for ones who is already familiar with them. It also supports advanced templating features.
  
- Debugging can be a bit challenging due to limited error messaging compared to the other more established engines.

###### After looking at the pros and cons of different templating engines i decided to use Nunjucks with Eleventy. i choose so because it allows me to use custom filters, tags and global functions when needed. i selected Eleventy because it alongside Nunjucks also allows me to use other templating language like markdown which gives me to use tools effectively.

---
## Other SSG applications 
Some of the other popular Static Site Generator are Hugo, Jekyll, SvelteKit, next.js and Gatsby.

## Hugo
- It is the fastest SSG and easy to set up with straightforward configuration.

- It is less suited for highly interactive application.
- It has its own templating language which might no be familiar to a lot of developers.   

## Next.js
- It supports both SSG and SSR which can be used for a variety of use cases like a simple blog or a complex dynamic application.

- It requires a good knowledge of react and has more configuration options which can overwhelming for simple use cases.

###### Out of all i decided to use Eleventy as it allows me to serve the content without using any client-side scripting. It allows me to use different templating languages together and also most of the eleventy sites do not require any plugins.

---
## Configurations Used
- I used the passthrough file copy which allows to copy a file or folder from the src directory to the output directory without processing the files. this is useful for assets like images, fonts and other static files. I also used .gitignore to exclude certain directories such as node modules. 

- Other settings that are worth exploring are custom permalinks that helps control the output URLs and pagination, which can help in generating pages dynamically based on data or collections.

---

## Front matter

- Front matter in eleventy is a way to include metadata at the top of your content files like title or tags. it helps in organizing and managing content for static websites. By defining metadata we can control how the content is displayed and structured. 

## Links 
- [Other SSG applications](https://hygraph.com/blog/top-12-ssgs)
- [MarkDown](https://hackernoon.com/pros-and-cons-of-using-markdown-for-technical-writing-34f277418a8a)
- [Templating_engines](https://hackernoon.com/pros-and-cons-of-popular-javascript-templating-engines)
- [Top 5 SSG applications](https://hygraph.com/blog/top-12-ssgs)







