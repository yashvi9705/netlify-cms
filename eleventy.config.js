const contentful = require("contentful-management");
var handlebars = require('handlebars');
var paginate = require('handlebars-paginate');
handlebars.registerHelper('paginate', paginate);
handlebars.registerHelper('pag', paginate);
const fs = require('fs');
require('dotenv').config();

const markdownIt = require("markdown-it");

handlebars.registerPartial('pagination', '{{pagination}}');

// this is the custom registered helper that check if 2 expressions are equivalent    
handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

//  this is another custom helper that increments the value by 1
handlebars.registerHelper('inc', function(value) {
  return parseInt(value) + 1;
});

handlebars.registerHelper('dateformat', require('helper-dateformat'));


async function Connect() {
    let client = await contentful.createClient({
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });
    let space = await client.getSpace(process.env.CLIENT_SPACE);
    return await space.getEnvironment("master");
}


(async () => {
    let env = await Connect();
    // console.log(env);
    
})();

// Function to create a new employee entry
async function createEmployee(employee) {
  try {
    const environment = await Connect();
    const assets = await environment.getAssets();


    // Find the asset by name
    const maleAssetId = assets.items.find(asset => asset.fields.title['en-US'] === 'Boy');
    const femaleAssetId = assets.items.find(asset => asset.fields.title['en-US'] === 'Girl');
    const imageAssetId = (employee.gender || "").toUpperCase() === "F" ? femaleAssetId.sys.id : maleAssetId.sys.id;

      
      // Create the new employee entry
      const entry = await environment.createEntry('employeeDirectory', {
          fields: {
              "id": {
                    "en-US": employee.id
                },
                "name": { 
                    "en-US": employee.name
                },
                "position": {
                    "en-US": employee.position
                },
                "department": {
                    "en-US": employee.department
                },
                "age": {
                    "en-US": employee.age
                },
                "location": {
                    "en-US": employee.location
                },
                "yearsOfExp": {
                    "en-US": employee.yearsOfExp
                },
                "email": {
                    "en-US": employee.email
                },
                "phone": {
                    "en-US": employee.contactNumber
                },
                "employmentDate": {
                    "en-US": employee.employmentDate
                },
                "status": {
                    "en-US": employee.status
                },
                "gender": {
                    "en-US": employee.gender
                },
                "image": {
                    "en-US": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Asset",
                            "id": imageAssetId
                        }
                    }
                }
                
          }
      });

      // console.log('Employee created successfully:', entry);
      return entry;
  } catch (error) {
      console.error('Error creating employee:', error);
  }
}

async function checkEmployee(employeeId) {
  try{
    const environment = await Connect();
    const entries = await environment.getEntries ({content_type: 'employeeDirectory',
      'fields.id': employeeId
    });
    return entries.items.length > 0;
  }catch (error) {
    console.error('Error checking if employee exists:', error);
    return false; 
  }

}

async function processEmployeeData() {
  try {

    const path = require('path');
    const data = fs.readFileSync(path.join(__dirname, '/src/_data/employee.json'), 'utf8');
    const employees = JSON.parse(data);

    for (const employee of employees) {
      // console.log(`Processing Employee: ${employee.name}`);

      // Check if the employee already exists in Contentful
      const exists = await checkEmployee(employee.id);
      
      if (!exists) {

        // Create the employee if not found
        await createEmployee(employee);
        // console.log(`Employee ${employee.name} created.`);
      } else {
        // console.log(`Employee ${employee.name} already exists. Skipping.`);
      }
    }
  } catch (error) {
      console.error('Error processing employee data:', error);
  }
}


async function CmsHelper(contentType, dateField){
  try {
    const environment = await Connect();
    const entries = await environment.getEntries({content_type: contentType});

        const promises = entries.items.map(async (item) => {
        const fields = item.fields;

        // Fetch image asset if it exists
        if (fields.image && fields.image['en-US'] && fields.image['en-US'].sys) {
          const assetId = fields.image['en-US'].sys.id;

          
          try {
              const asset = await environment.getAsset(assetId);
              fields.imageUrl = asset.fields.file['en-US'].url; // Store the image URL
          } catch (error) {
              // console.error(`Error fetching asset with ID ${assetId}:`, error);
              fields.imageUrl = null; // Handle error case
          }
      }
        // to ensure slug is fetched
        fields.slug = fields.slug ? fields.slug['en-US'] : null;

        // Extract and parse the publicationDate field
        if (fields[dateField] && fields[dateField]['en-US']) {
          const publicationDateStr = fields[dateField]['en-US']; // Extract the date string
          const parsedDate = new Date(publicationDateStr); // Parse the date string


          // Check if the parsed date is valid
          if (!isNaN(parsedDate.getTime())) {
            fields[dateField] = parsedDate;
           
          } else {
            // If the date is invalid, log an error and set to null
            // console.error(`Invalid publication date: ${publicationDateStr} for entry ID: ${item.sys.id}`);
            fields[dateField] = null;
        
          }
        }
      
        return fields; // Return fields with imageUrl
    });

    // Wait for all promises to resolve, then sort by publishDate in descending order
    const sortedEntries = await Promise.all(promises);

    // Sort entries by the publishDate in descending order
    sortedEntries.sort((a, b) => {
      // Check if both dates are valid Date objects
      if (a[dateField] && b[dateField]) {
        return b[dateField].getTime() - a[dateField].getTime();  // Newest first
      }
      return 0; // If dates are invalid, leave them in their original order
    });

  // Log sorted dates to verify the sorting
  // console.log("Sorted entries by date:", sortedEntries.map(entry => entry[dateField]));

  return sortedEntries;



} catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return []; 
}

};



module.exports = function(eleventyConfig) {
  // Copy `img/` to `_site/img as well as the css to the cite css`
	eleventyConfig.addPassthroughCopy("./src/css");
  // Copy `img/` to `_site/img`
	eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addWatchTarget("./src/css/");


  eleventyConfig.on("eleventy.before", async ({dir, runMode, outputMode}) =>{
    console.log('starting to build')
    // console.log(dir.output)
    fs.rmSync(dir.output, {recursive: true, force: true });

    // Process employee data before build starts
    await processEmployeeData();
  });

  eleventyConfig.on("eleventy.after", async ({dir, runMode, outputMode}) =>{
    console.log('The built is completed')  
  });
  
  eleventyConfig.addGlobalData("contentfulData", async () => {
    const sortedEntries = await CmsHelper("blogPost", "publicationDate");
    return sortedEntries;
  });

  eleventyConfig.addGlobalData("employeeData", async () => {
    const sortedEntries = await CmsHelper("employeeDirectory", "employmentDate");
    return sortedEntries;
  });

  // Add a collection to group and sort employees by department
  eleventyConfig.addCollection('employeesByDepartment', function() {

    const path = require('path');
    const data = fs.readFileSync(path.join(__dirname, '/src/_data/employee.json'), 'utf8');
    const employees = JSON.parse(data);

    // Sort employees by department alphabetically
    employees.sort((a, b) => {
      const departmentA = a.department.toLowerCase();
      const departmentB = b.department.toLowerCase();
      return departmentA.localeCompare(departmentB);
    });

    // Return the sorted employees
    return employees;
  });


  const md = new markdownIt({
    html: true,  
    breaks: true,  
    linkify: true  
  });

  // Add Markdown filter
  eleventyConfig.addFilter("renderMarkdown", function(content) {
    // Check if the content is a string before rendering
    if (typeof content === "string") {
      return md.render(content);  // Render Markdown to HTML
    } else {
      console.error("Non-string data passed to renderMarkdown filter:", content);
      return "";
    }
  });

  eleventyConfig.addPairedShortcode("myShortcode", function(content) {
  
    return md.render(content);
  });


  eleventyConfig.setLibrary("hbs", handlebars);

  

  // Return your Object options:
  return {
      dir: {
        input: "src",
        output: "dist"
      }
  }
};