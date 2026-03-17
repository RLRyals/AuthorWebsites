const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const navigationOptions = require('./src/_data/navigationConfig');
const posts = require('./src/_data/posts');
const { DateTime } = require("luxon");
const links = require('./src/_data/links.js');
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");
// If profiles.js doesn't exist, copy from profiles.example.js so new clones work out of the box
const profilesPath = path.join(__dirname, "src/_data/profiles.js");
if (!fs.existsSync(profilesPath)) {
    const examplePath = path.join(__dirname, "src/_data/profiles.example.js");
    if (fs.existsSync(examplePath)) {
        fs.copyFileSync(examplePath, profilesPath);
        console.log("[setup] Created profiles.js from profiles.example.js — edit it with your own pen names.");
    }
}
const authorData = require("./src/_data/profiles");
const currentPenName = process.env.ELEVENTY_PEN_NAME || Object.keys(authorData.profiles)[0];
const activeProfile = authorData.profiles[currentPenName];
const booksData = activeProfile.bookList
    ? require(`./src/_data/${activeProfile.bookList}`)
    : { books: [] };
const books = booksData.books || booksData;
const site = require("./src/_data/site");


module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);

    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    // Add a global data filter or variable for navigation options
    eleventyConfig.addGlobalData("navigationOptions", navigationOptions);
    eleventyConfig.addGlobalData("posts", posts);
    // Select the current author's profile based on `currentPenName`
    //const activeProfile = authorData.profiles[authorData.currentPenName];

    eleventyConfig.addGlobalData("author", activeProfile);
    eleventyConfig.addGlobalData("books", books);

    // Exclude other authors' blog posts
    const excludedPenNames = Object.keys(authorData.profiles).filter(penName => penName !== currentPenName);
    excludedPenNames.forEach(penName => {
        const blogFolder = authorData.profiles[penName].blogFolder;
        eleventyConfig.ignores.add(`./src/${blogFolder}/**/*`);
    });

    eleventyConfig.addCollection("blog", function (collectionApi) {
        return collectionApi
            .getFilteredByGlob(`src/${activeProfile.blogFolder}/*.md`);
    });
    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByTag("blog").sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    });

    eleventyConfig.addFilter("permalink", function (slug) {
        return `/blog/${slug}/`;
    });

    // Theme CSS concatenation: theme variables + base structural CSS + author overrides
    // Output a single /css/theme.css for the active author's site
    eleventyConfig.on('eleventy.before', async () => {
        const themeName = activeProfile.theme || 'dark-gothic';
        const baseCss = fs.readFileSync(path.join(__dirname, 'src/themes/_base.css'), 'utf8');
        const themeCss = fs.readFileSync(path.join(__dirname, `src/themes/${themeName}/theme.css`), 'utf8');

        let authorCss = '';
        if (activeProfile.styles) {
            const authorCssPath = path.join(__dirname, 'src/css', activeProfile.styles);
            if (fs.existsSync(authorCssPath)) {
                authorCss = fs.readFileSync(authorCssPath, 'utf8');
            }
        }

        const combined = [
            `/* Theme: ${themeName} | Author: ${activeProfile.penName} */`,
            '/* --- Base Styles --- */',
            baseCss,
            '/* --- Theme Overrides --- */',
            themeCss,
            '/* --- Author Overrides --- */',
            authorCss
        ].join('\n\n');

        const outputDir = path.join(__dirname, activeProfile.outputFolder, 'css');
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'theme.css'), combined);
    });

    // Copy the images folder to the output directory
    eleventyConfig.addPassthroughCopy("src/images");

    // Include admin folder only for local development (npm start)
    // Deployed sites should NOT include the admin folder
    if (process.env.ELEVENTY_PEN_NAME) {
        eleventyConfig.ignores.add("./src/admin/**/*");
    } else {
        eleventyConfig.addPassthroughCopy("src/admin");
    }

    eleventyConfig.addFilter("dateIso", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
    });
    // Add `dateReadable` filter
    eleventyConfig.addFilter("dateReadable", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM dd, yyyy");
    });

    //eleventyConfig.addFilter("date", (dateObj, format = "yyyy LLL dd") => {
    //  return DateTime.fromJSDate(dateObj).toFormat(format);
    //});

    eleventyConfig.addGlobalData("site", site);

    eleventyConfig.addShortcode("link", function (key) {
        return links[key] || "#"; // Return the link if it exists, or "#" as a fallback
    });

    return {
        // When a passthrough file is modified, rebuild the pages:
        passthroughFileCopy: true,
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            dataTemplateEngine: "njk",
            output: activeProfile.outputFolder  // Change output directory dynamically
        }
        //,
        //// Filter blog posts dynamically
        //collections: {
        //    blog: function (collectionApi) {
        //        return collectionApi.getFilteredByGlob(`src/${activeProfile.blogFolder}/*.md`);
        //    }
        //}
    };
};