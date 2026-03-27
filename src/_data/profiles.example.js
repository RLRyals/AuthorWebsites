/**
 * profiles.example.js — Example pen name profiles
 *
 * Copy this file to profiles.js to get started:
 *   cp src/_data/profiles.example.js src/_data/profiles.js
 *
 * Then replace the example profiles with your own pen names.
 * profiles.js is gitignored so your real pen names stay private.
 *
 * You can also use the /add-penname command in Claude Code to create
 * new pen names interactively.
 */
module.exports = {
    profiles: {
        "Rod Thunderen": {
            penName: "Rod Thunderen",
            realName: "Not Shared", // Optional
            website: "https://rodthunderen.com",
            pageTitle: "Rod Thunderen",
            email: "hello@rodthunderen.com",
            newsletter: {
                // Paste your embed code from Kit, MailerLite, SendFox, Flowdesk, etc.
                embedCode: "",
                // OR provide a direct link to Substack, Patreon, etc.
                url: ""
            },
            bio: `Rod Thunderen, is your go-to author for thrilling Urban Fantasy detective novels.
            \nThe unique blend of magic and technology will transport you into a world where dragons exist and mysteries abound.
            \nInspired by the likes of The Dresden Files and Altered Carbon, the novels offer a captivating reading experience that will leave you wanting more.
            \nWhether you're a fan of the genre or new to Urban Fantasy, these books are sure to keep you hooked from the first page to the last.
            \nExplore the extraordinary and immerse yourself in a world where the supernatural meets the modern.\n\n`,
            genre: "Urban Fantasy Detective",
            social: {
                twitter: "@rodthunderen",
                facebook: "https://facebook.com/rodthunderen"
            },
            homepage: {
                heading: "Urban Fantasy Detective Series",
                tagline: "Her mother's murder. Someone else's hands.",
                description: "Step into a world where arcane rituals collide with neon-lit noir — a detective story forged in sorcery and steel. Think Altered Carbon meets dragons.",
                seriesName: "The Neon Rites Series",
                seriesBlurb: "Detective Kael Voss walks the line between two worlds — the city's gleaming tech-driven surface and the occult network humming beneath it. When his mother is found dead inside a ward no living mage should know, Kael is dragged into a conspiracy that spans centuries.\n\nThree books. One mystery. A city that refuses to stay dead.",
                ctaText: "Read Book One",
                ctaPrimaryLink: "",          // URL for primary CTA (falls back to first book's link)
                ctaSecondary: "Listen to Podcast",
                ctaSecondaryLink: "#podcast"
            },
            outputFolder: "_site_rodthunderen", // Custom output directory
            theme: "urban-noir", // Theme from src/themes/
            styles: "authors/rodthunderen.css", // Author overrides in src/css/authors/
            background: "/images/website_background.jpg",
            siteLayout: "topnav", // "sidebar" or "topnav"
            blogFolder: "blogs/rodthunderen",
            bookList: "rodthunderen_books.json"
        },
        "Jane Doe": {
            penName: "Jane Doe",
            realName: "Not Shared", // Optional
            website: "https://janedoeauthor.com",
            pageTitle: "Jane Doe",
            email: "reply@janedoeauthor.com",
            newsletter: {
                // Paste your embed code from Kit, MailerLite, SendFox, Flowdesk, etc.
                embedCode: "",
                // OR provide a direct link to Substack, Patreon, etc.
                url: ""
            },
            bio: `Jane Doe writes cozy mysteries set in small towns where everybody knows your name — and somebody knows your secrets.
            \nHer Maple Lane Mystery Series follows retired librarian Dotty Marsh as she trades card catalogs for crime scenes, armed with sharp intuition and a bottomless pot of Earl Grey.
            \nPerfect for fans of Joanne Fluke, Diane Mott Davidson, and anyone who believes the best clues come with a side of homemade pie.`,
            genre: "Cozy Mystery",
            social: {
                twitter: "@janedoeauthor",
                facebook: "https://facebook.com/janedoeauthor"
            },
            homepage: {
                heading: "Cozy Mystery Series",
                tagline: "Small towns. Big secrets. Fresh-baked clues.",
                description: "Curl up with a mystery where the suspects are charming, the setting is quaint, and the amateur sleuth always gets her answer — right after tea.",
                seriesName: "The Maple Lane Mysteries",
                seriesBlurb: "When retired librarian Dotty Marsh moves to the sleepy village of Maple Lane, she expects quiet mornings and garden club meetings. Instead, she finds a body in the bookshop and a town full of people with something to hide.\n\nThree books. One nosy librarian. A village that's anything but peaceful.",
                ctaText: "Read Book One",
                ctaPrimaryLink: "",          // URL for primary CTA (falls back to first book's link)
                ctaSecondary: "Join the Book Club",
                ctaSecondaryLink: "/newsletter/"
            },
            outputFolder: "_site_janedoe", // Custom output directory
            theme: "clean-modern", // Theme from src/themes/
            styles: "authors/janedoe.css", // Author overrides in src/css/authors/
            background: "/images/janedoe-bg.jpg",
            siteLayout: "sidebar", // "sidebar" or "topnav"
            sidebarImage: "/images/janedoe/sidebar-bg.svg", // Background image for sidebar
            blogFolder: "blogs/janedoe",
            bookList: "janedoe_books.json"
        },
        "John Smith": {
            penName: "John Smith",
            realName: "Not Shared",
            website: "https://johnsmithbooks.com",
            pageTitle: "John Smith",
            email: "contact@johnsmithbooks.com",
            newsletter: {
                // Paste your embed code from Kit, MailerLite, SendFox, Flowdesk, etc.
                embedCode: "",
                // OR provide a direct link to Substack, Patreon, etc.
                url: ""
            },
            bio: `John Smith writes science fiction that asks uncomfortable questions about where humanity is headed — and whether we deserve to get there.
            \nHis Fractured Horizon series imagines a near-future Earth fractured by corporate sovereignty, rogue AI, and the last generation that remembers what freedom felt like.
            \nFor readers who love Philip K. Dick, Blake Crouch, and stories where the technology is plausible and the stakes are personal.`,
            genre: "Science Fiction, Dystopian",
            social: {
                twitter: "@johnsmithbooks",
                facebook: "https://facebook.com/johnsmithbooks"
            },
            homepage: {
                heading: "Science Fiction Series",
                tagline: "The future isn't coming. It's already here.",
                description: "Near-future sci-fi where corporate empires replace nations, AI blurs the line between tool and tyrant, and one generation fights to remember what freedom meant.",
                seriesName: "The Fractured Horizon Series",
                seriesBlurb: "In 2087, Earth's governments have collapsed under the weight of climate debt and corporate buyouts. Mira Chen is a memory auditor — paid to verify that citizens' implanted recollections match the corporate record. When she finds a memory that shouldn't exist, she becomes the most wanted person on the planet.\n\nThree books. One impossible memory. A world built on convenient lies.",
                ctaText: "Read Book One",
                ctaPrimaryLink: "",          // URL for primary CTA (falls back to first book's link)
                ctaSecondary: "Read the Blog",
                ctaSecondaryLink: "/blog/"
            },
            outputFolder: "_site_johnsmith", // Custom output directory
            theme: "sci-fi-tech", // Theme from src/themes/
            styles: "authors/johnsmith.css", // Author overrides in src/css/authors/
            background: "/images/johnsmith-bg.jpg",
            siteLayout: "topnav", // "sidebar" or "topnav"
            blogFolder: "blogs/johnsmith",
            bookList: "johnsmith_books.json"
        }
    }
};
