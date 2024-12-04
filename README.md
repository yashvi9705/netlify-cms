
## **CMS-Driven Website with Eleventy and Contentful**

This project demonstrates a CMS-driven website built using Eleventy as the Static Site Generator and Contentful as the headless CMS. The site includes a Blog Section and a Custom Schema Section, showcasing features like dynamic content fetching, pagination, filtering, and modern templating.

---

## **Getting Started**

### **Prerequisites**
#### Ensure the following are installed on your system:
- **Node.js** 
- **npm** 

#### Verify installations:
```
node -v
npm -v
```

---

### **Setup**
#### **Install Dependencies**
```
npm install
```

#### **Contentful Configuration**
1. **Install Contentful Management SDK**:
   ```
   npm install contentful-management
   ```

2. **Generate a Management API Access Token**:
   - Log in to Contentful.
   - Navigate to **Settings** > **API Keys**.
   - Under **Content Management Tokens**, click **Generate Personal Token**.
   - Provide a name for the token and save it.
   - Copy the generated token for later use.

3. **Create a `.env` File**:
   - At the project root, create a `.env` file.
   - Add the following:
     ```
     CONTENTFUL_SPACE_ID=your_space_id
     CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
     CONTENTFUL_MANAGEMENT_TOKEN=your_management_api_token
     ```

4. **Set up Content Models**:
   - Log into Contentful and create:
     - A **Blog Post** model with fields like `title`, `content`, `date`, and optionally an `image`.
     - A **Custom Schema** model with the specific employee directory project data.

---

### **Running the Project**
#### **Development Server**:
To run the development server locally:
```
npm run dev
```
Visit [http://localhost:8080](http://localhost:8080) in your browser.

#### **Build for Production**:
To generate static files:
```
npm run build
```
Output will be in the `dist` folder.

---

### **Usage**

#### **Adding Content via Contentful**
1. Log in to the Contentful.
2. Navigate to your space.
3. Create entries in your **Blog Post** or **Custom Schema(employee Directory)** content types.
4. The new content will automatically sync during the next build.

#### **Content Fetching**
- Contentful's RESTful API is used for fetching content at build time.
- Blog posts are rendered dynamically using Handlebars and it supports pagination.

#### **Pagination and Filtering**
- Blogs can be navigated using forward/backward buttons based on the publication date.
- Filtering is enabled for employee directory entries based on defined fields like department or years of experience.

---

### **Code Overview**

#### **File Structure**:
- `/src`: Contains all the source files for the project.
- `/layouts`: Includes reusable layout files.
- `/eleventy.config.js`: Handles Contentful API integration.
- `/dist`: Contains the build output after running `npm run build`.

#### **Key Scripts**:
- `npm run dev`: Starts the local Eleventy server for development.
- `npm run build`: Generates static HTML files for production.

---

### Sorting Employees by Department

This section outlines how I implemented the "Sort by Department" feature for dynamically grouping employees by their departments. I'll explain what I did, the challenges I faced, and the steps I plan to take to improve it further.

---

### **What I Did**

#### **1. Grouping Employees by Department**
To organize employees into their respective departments, I used Eleventy collections. This logic processed the employee data, sorted it by department, and grouped employees into arrays for each department. This ensures that the employees are neatly grouped by department for easy rendering in the template.

---

#### **2. Rendering the Department View**
To display the grouped employees, I created a template that shows each department as a header followed by a list of employees:

```
<div id="department-container" class="mt-4" style="display: none;">
  {{#each collections.employeesByDepartment}}
    <div>
      <h2>{{this.department}}</h2>
      <ul>
        {{#each this.employees}}
          <li><strong>{{this.name}}</strong> - {{this.position}}</li>
        {{/each}}
      </ul>
    </div>
  {{/each}}
</div>
```
This groups employees visually under their respective departments.

---

#### **3. Adding the "Sort by Department" Button**
I added a button to toggle the sorted view. By default, the sorted view is hidden and it is only shown when the button is clicked. I added this functionality through javascript. This helps to keep the default view clean and only lets users see the grouped data when needed.

---

### **Challenges I Faced**

1. **Repeated Department Headers**   
   A challenge I faced was that the department name was being repeated if there were multiple people in the same department. For example, the department name "Analytics" would show up for both "Bob Smith" and "Paul Adams," making the header repetitive. This resulted in the same department name appearing multiple times, which was not ideal for the layout. I'm still working on finding a solution to ensure each department name is only displayed once, regardless of how many employees belong to that department.

2. **Switching Views**  
   Once the department view is displayed, there is no easy way to toggle back to the default paginated view.

---
### **Future Improvements**
1. Ensure department headers appear only once
2. Implement a button to switch between the paginated and sorted views for a better user experience.
3. Allow users to filter by specific criteria like department, position or years of experience.

---

### **Conclusion**
The "Sort by Department" feature successfully displays employees grouped by their respective departments. However, the repeated header issue in edge cases remains unresolved and needs further debugging. Despite this, the feature is functional and provides a foundation for further enhancements.
