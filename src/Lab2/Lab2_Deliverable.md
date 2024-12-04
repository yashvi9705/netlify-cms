---
layout: layouts/default.hbs
---

# LAB 2 Deliverable

 
### Different headless CMS systems.

### 1. Contentful
---

- Contentful was an early player in the headless space and was originally considered a developer-centric platform, but in the certain years feature development has leaned more towards the business user.

##### Features:
  - It has a large marketplace of apps and extension to connect range of tools and works with all modern frameworks. 
  - It can deliver content to any frontend channel via API.

##### Limitations:
  - It lacks a couple of factors when it comes to data modeling and developer experience.
  - Contentful studio editor is only available at the premium pricing tier, with a limited editing UI.


### 2. Prismic
---

- It lets editors build web and mobile pages like a slide deck. developers can create fully designed page slice which they can mix and match to quickly build pages.

##### Features:
  - Developers can define content slices and create a variety of front-end design options for each slice using Next.js or Sceltekit as a framework. 
  - Editors can pick different options to build a page which allows them to create unique pages with a consistent design.

##### Limitations:
  - It is terrific if we want to create slick looking marketing brochure sites and is not intended to handle more complex use cases. 
  - It is difficult to create relationship logic between slices and developer testing is only available in the platinum pricing tier.

### 3. Sanity
- It is a good fit for small to medium-sized teams prioritizing real-time collaborations and a customizable content studio.

##### Features:
  - It allows real-time collaboration with live multi-user editing. 
  - It has customizable content studio for intuitive editorial experience. 
  - It has pay-as-you-go pricing which is suitable for scaling projects. 

##### Limitations:
  - It requires development resources for initial setup and ongoing maintenance. 
  - It is a steeper learning curve for non-technical users compared to traditional CMSs.


### 4. Strapi
- It provides a core platform logic that developers can extend with custom built plugins.The combination of open source and headless makes it a great fit for certain companies.

##### Features:
  - The community edition is free but we do need to pay for the cost on hosting, feature development and platform maintenance. 
  - The entire codebase is available on github and open to customization, including the API.

##### Limitations:
  - It has typical problems with the open source software. 
  - As a very developer-centric solution it can be hard to learn for business users and since the user is fully responsible for the performance and security it gets more complex to maintain when more customization is added. 


### 5. Ghost
- It is a headless CMS and blogging platform designed for writers and publishers. It offers a streamlined, intuitive interface for creating and managing content, as well as a variety of powerful tools for monetizing content and building a loyal audience.

##### Features:
  - Ghost provides a simple, distraction-free interface for creating and publishing blog posts and other content types. 
  - It offers a variety of customizable themes, making it easy to create a unique look and feel for your website or blog.

##### Limitations:
  - It has limited customization options for non-blog content types. 
  - May not be ideal for businesses with more complex needs.

---

  After researching a few options, I tried setting up Prismic, Contentful, and Strapi, and decided to go with Contentful for my next assignment. It had a user-friendly interface, good API support, and worked well with my Handlebars project. Contentful also made it easy to manage my content and fit my assignment needs better overall. 

In the below setup:
- The first two images show the code setup in Eleventy configuration and a template page to connect it as the headless CMS.

- The next two images display the CMS account setup, blog initialization, and the final output of the blog content rendered on Eleventy.

#### CONTENTFUL setup 

##### ![samplepage](/img/contentful1.png) ![samplepage](/img/contentful2.png)
###### ![samplepage](/img/contentful3.png) ![samplepage](/img/contentful4.png) 

---

#### PRISMIC setup 

###### ![samplepage](/img/prismic3.png) ![samplepage](/img/prismic2.png) 
##### ![samplepage](/img/prismicCMS.png) ![samplepage](/img/prismic4.png)

---

#### SANITY setup 

##### ![samplepage](/img/sanity1.png) ![samplepage](/img/sanity2.png)
###### ![samplepage](/img/sanity3.png) ![samplepage](/img/sanity4.png)
    
---

## Links 
- [Ghost and Strapi](https://hygraph.com/blog/best-headless-cms)
- [All the CMS](https://hackernoon.com/pros-and-cons-of-using-markdown-for-technical-writing-34f277418a8a)
- [Sanity](https://www.searchenginejournal.com/best-headless-cms/522674/#sanity)

---





