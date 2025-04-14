const apiDocData = [
    {
        title: "Get all projects",
        name: "projects-api",
        description: "The Get Projects API allows you to retrieve a comprehensive list of all public projects available in the system. This API provides detailed information about each project, including the project title, description, technologies used, GitHub repository, live project URL, and more. With this API, users can explore a variety of projects, whether they are ongoing or completed, and view the associated details like the project's start and end dates and the technologies implemented. It's a great way to showcase projects publicly and easily integrate them into any web application or platform.",
        method: "GET",
        endpoint: "/api/public/projects",
        headers: {
            "Authorization": "Bearer YOUR_API_TOKEN"
        },
        parameters: {
            path: [] // No path parameters for this endpoint
        },
        response: {
            status: 200,
            body: [
                {
                    "id": "project12345",
                    "title": "Sample Project",
                    "startYear": 2023,
                    "startMonth": 6,
                    "endYear": 2025,
                    "endMonth": 12,
                    "isCurrent": true,
                    "banner": "https://example.com/mock-banner.png",
                    "technologies": ["Technology1", "Technology2", "Technology3"],
                    "gitHub": "https://github.com/mockuser/mockproject1",
                    "web": "https://example.com",
                    "description": "This is a mock project to demonstrate API functionality.",
                    "userId": "mockuser123",
                    "createdDate": "2025-03-20T14:30:00Z"
                }
            ]

        }
    },

    {
        title: "Get user info",
        name: "user-api",
        description: "Fetches public user information based on the provided API Token. The response includes user details such as name, profile picture, bio",
        method: "GET",
        endpoint: "/api/public/user",
        headers: {
            "Authorization": "Bearer YOUR_API_TOKEN"
        },
        parameters: {
            path: []
        },
        response: {
            status: 200,
            body: {
                "email": "johndoe@gmail.com",
                "fname": "John",
                "lname": "Doe",
                "profile": "https://example.com/profile.jpg",
                "phone": "123-456-7890",
                "address": "1234 Elm Street",
                "cv": "https://example.com/cv.pdf",
                "bio": "I am the owner of this portfolio website."
            }
        }
    },

    {
        title: "Portfolio visits",
        name: "portfolio-visit-api",
        description: "Tracks visits to a portfolio. The deviceId can be used to identify individual devices, which can be generated on the frontend. If no deviceId is provided, an empty string can be passed.",
        method: "POST",
        endpoint: "/api/public/visits/{deviceId}",
        headers: {
            "Authorization": "Bearer YOUR_API_TOKEN"
        },
        parameters: {
            path: [
                {
                    name: "deviceId",
                    type: "string",
                    description: "A unique identifier for the device visiting the portfolio. This is used to track visits from different devices. If no device ID is available, an empty string can be used.",
                    required: true,
                    example: "1234567890abcdef"
                }
            ]
        },
        response: {
            status: 200,
            body: {} // No content response
        }
    },

    {
        title: "Get user skills",
        name: "skills-api",
        description: "Fetches the public skills of a user based on the provided API Token.",
        method: "GET",
        endpoint: "/api/public/skills",
        headers: {
            "Authorization": "Bearer YOUR_API_TOKEN"
        },
        parameters: {
            path: []
        },
        response: {
            status: 200,
            body: [
                {
                    "id": "skill123",
                    "name": "JavaScript",
                    "icon": "https://example.com/icons/javascript.png",
                    "expertLevel": "Beginner"
                }
            ]
        }
    },
    {
        title: "Get user education experiences",
        name: "education-api",
        description: "Fetches the public education history of a user based on the provided API Token.",
        method: "GET",
        endpoint: "/api/public/education",
        headers: {
            "Authorization": "Bearer YOUR_API_TOKEN"
        },
        parameters: {
            path: []
        },
        response: {
            status: 200,
            body: [
                {
                    "id": "edu123",
                    "college": "University of Example",
                    "course": "Bachelor of Science in Computer Science",
                    "startYear": 2019,
                    "endYear": 2023,
                    "startMonth": 9,
                    "endMonth": 6,
                }
            ]
        }
    },
    {
        title: "Get user work experiences",
        name: "experience-api",
        description: "Fetches the public work experiences of a user based on the provided API Token.",
        method: "GET",
        endpoint: "/api/public/experience",
        headers: {
            "Authorization": "Bearer YOUR_API_TOKEN"
        },
        parameters: {
            path: []
        },
        response: {
            status: 200,
            body: [
                {
                    "id": "exp123",
                    "company": "Example Corp",
                    "role": "Software Engineer",
                    "startYear": 2019,
                    "endYear": 2023,
                    "startMonth": 9,
                    "endMonth": 6,
                    "stillWorking": false,
                    "description": "Worked on various projects and collaborated with team members."
                }
            ]
        }
    },

    {
        title: "Create a testimonial",
        name: "testimonial-create-api",
        description: "Allows users to add a new testimonial to the system. This includes their name, email, review, profile image (as a URL or base64 string), and LinkedIn profile URL.",
        method: "POST",
        endpoint: "/api/private/testimonials",
        headers: {
            "Authorization": "Bearer YOUR_API_TOKEN",
            "Content-Type": "application/json"
        },
        parameters: {
            path: []
        },
        requestBody: {
            description: "Testimonial data to create.",
            required: true,
            body: {
                "name": "John Doe",
                "email": "johndoe@gmail.com",
                "review": "John Doe is a great person to work with. Highly recommended!",
                "profile": "https://example.com/profile.jpg",
                "linkedIn": "https://www.linkedin.com/in/johndoe/",
                "workPlace": "Example Corp",
                "position": "Software Engineer",
            }
        },
        response: {
            status: 201,
            body: {
                "id": "1234567890abcdef",
                "name": "John Doe",
                "email": "johndoe@gmail.com",
                "review": "John Doe is a great person to work with. Highly recommended!",
                "profile": "https://example.com/profile.jpg",
                "linkedIn": "https://www.linkedin.com/in/johndoe/",
                "workPlace": "Example Corp",
                "position": "Software Engineer",
            }
        }
    },

    {
        title: "Get testimonials",
        name: "testimonial-api",
        description: "Fetches all testimonials associated with a user, including details like the name, profile image, review, LinkedIn URL, and the status of approval.",
        method: "GET",
        endpoint: "/api/public/testimonials",
        headers: {
            "Authorization": "Bearer YOUR_API_TOKEN"
        },
        parameters: {
            path: []
        },
        response: {
            status: 200,
            body: [
                {
                    "id": "1234567890abcdef",
                    "name": "John Doe",
                    "email": "johndoe@gmail.com",
                    "review": "John Doe is a great person to work with. Highly recommended!",
                    "profile": "https://example.com/profile.jpg",
                    "linkedIn": "https://www.linkedin.com/in/johndoe/",
                    "workPlace": "Example Corp",
                    "position": "Software Engineer",
                }
            ]
        }
    }
    // {
    //     title: "Update project details",
    //     description: "Updates the details of a specific project. The project ID must be provided in the URL path.",
    //     method: "PUT",
    //     endpoint: "/api/private/projects/{projectId}",
    //     headers: {
    //         "Authorization": "Bearer YOUR_API_TOKEN",
    //         "Content-Type": "application/json"
    //     },
    //     parameters: {
    //         path: [
    //             {
    //                 name: "projectId",
    //                 type: "string",
    //                 description: "The unique identifier of the project being updated.",
    //                 required: true,
    //                 example: "67dd9d68141278064ccbaa95"
    //             }
    //         ]
    //     },
    //     requestBody: {
    //         description: "Project details to update.",
    //         required: true,
    //         body: {
    //             title: { type: "string", description: "Project title", required: true, example: "Updated Mock Project One" },
    //             description: { type: "string", description: "Project description", required: true, example: "This is the updated project description with more features." },
    //             technologies: { type: "array", description: "Technologies used", required: true, example: ["React", "Node.js", "MongoDB"] },
    //             banner: { type: "string", description: "URL of project banner", required: true, example: "https://mockurl.com/updated_banner.png" },
    //             gitHub: { type: "string", description: "GitHub repository URL", required: true, example: "https://github.com/mockuser/updatedproject" },
    //             web: { type: "string", description: "Live project URL", required: true, example: "https://updatedmockproject.com" },
    //             startYear: { type: "number", description: "Start year of the project", required: true, example: 2023 },
    //             startMonth: { type: "number", description: "Start month of the project", required: true, example: 6 },
    //             endYear: { type: "number", description: "End year of the project", required: true, example: 2025 },
    //             endMonth: { type: "number", description: "End month of the project", required: true, example: 12 },
    //             isCurrent: { type: "boolean", description: "Whether the project is currently ongoing", required: true, example: true },
    //             userId: { type: "string", description: "User ID of the project creator", required: true, example: "mockuser123" }
    //         }
    //     },
    //     response: {
    //         status: 200,
    //         body: {
    //             id: "67dd9d68141278064ccbaa95",
    //             title: "Updated Mock Project One",
    //             description: "This is the updated project description with more features.",
    //             technologies: ["React", "Node.js", "MongoDB"],
    //             banner: "https://mockurl.com/updated_banner.png",
    //             gitHub: "https://github.com/mockuser/updatedproject",
    //             web: "https://updatedmockproject.com",
    //             startYear: 2023,
    //             startMonth: 6,
    //             endYear: 2025,
    //             endMonth: 12,
    //             isCurrent: true,
    //             userId: "mockuser123",
    //             createdDate: "2025-03-21T17:09:56.556Z"
    //         }
    //     }
    // },
    // {
    //     title: "Delete a project",
    //     description: "Deletes a project from the system by ID.",
    //     method: "DELETE",
    //     endpoint: "/api/private/projects/{projectId}",
    //     headers: {
    //         "Authorization": "Bearer YOUR_API_TOKEN"
    //     },
    //     parameters: {
    //         path: [
    //             {
    //                 name: "projectId",
    //                 type: "string",
    //                 description: "The unique identifier of the project to be deleted.",
    //                 required: true,
    //                 example: "67dd9d68141278064ccbaa95"
    //             }
    //         ]
    //     },
    //     response: {
    //         status: 204,
    //         body: {} // No content response
    //     }
    // }
];

export default apiDocData;
