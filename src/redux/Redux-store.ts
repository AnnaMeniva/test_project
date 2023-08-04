export interface DataPostsInterface{    
    PageTitle: string
    Creater: string
    Status: boolean
    Author: string
    id: number    
}

export interface DataFileInterface{
    id: number
    imageURL: string
    fileName: string
    createdAt: string
}
export interface DataUsersInterface{
    id: number
    fullName: string
    email: string
    password: string
    isAdmin: boolean
    isAuth: boolean
    avatar: string
}


export const posts: Array<DataPostsInterface> = [
    {
        PageTitle: "Home page",
        Creater: "Updated 3 weeks ago",
        Status: true,
        Author: "Joe Bloogs", 
        id:1
    },
    {
        PageTitle: "About page",
        Creater: "Updated 4 weeks ago",
        Status: true,
        Author: "Joe Bloogs",
        id:2      
    },
    {
        PageTitle: "Home page",
        Creater: "Updated 3 weeks ago",
        Status: false,
        Author: "Joe Bloogs",
        id:3 
    },
    {
        PageTitle: "Home page",
        Creater: "Updated 3 weeks ago",
        Status: true,
        Author: "Joe Bloogs",
        id:4 
    },
    {
        PageTitle: "About page",
        Creater: "Updated 3 weeks ago",
        Status: true,
        Author: "Joe Bloogs",
        id:5       
    },        
    {
        PageTitle: "Home page",
        Creater: "Updated 2 weeks ago",
        Status: true,
        Author: "Joe Bloogs", 
        id:6
    },
    {
        PageTitle: "About page",
        Creater: "Updated 1 weeks ago",
        Status: true,
        Author: "Joe Bloogs",
        id:7
    },
    {
        PageTitle: "Home page",
        Creater: "Updated 3 weeks ago",
        Status: true,
        Author: "Joe Bloogs",
        id:8
    },
    {   
        PageTitle: "Home page",
        Creater: "Updated 3 weeks ago",
        Status: true,
        Author: "Joe Bloogs",
        id:9
    },
    {
        PageTitle: "About page",
        Creater: "Updated 3 weeks ago",
        Status: true,
        Author: "Joe Bloogs",
        id:10
    },
    {
        PageTitle: "About page",
        Creater: "Updated 3 weeks ago",
        Status: true,
        Author: "Joe Bloogs",
        id:11  
    }   
]

export const files: Array<DataFileInterface> = [
    {
        id: 1,
        imageURL: "https://www.svgrepo.com/show/505199/donut.svg",
        fileName: "Donut_SVG _Vector",
        createdAt: "Uploaded 3 weeks ago",
    },
    {
        id: 2,
        imageURL: "https://www.svgrepo.com/show/505196/cake.svg",
        fileName: "Cake_SVG _Vector",
        createdAt: "Uploaded 2 days ago",
    },
    {
        id: 3,
        imageURL: "https://www.svgrepo.com/show/505198/sushi.svg",
        fileName: "Sushi_SVG _Vector",
        createdAt: "Uploaded 2 weeks ago",
    },
    {
        id: 4,
        imageURL: "https://www.svgrepo.com/show/505195/hand-pulled-noodle.svg",
        fileName: "Hand_pulled_noodle_SVG _Vector",
        createdAt: "Uploaded 1 weeks ago",
    },
    {
        id: 5,
        imageURL: "https://www.svgrepo.com/show/505202/hamburger.svg",
        fileName: "Hamburger_SVG _Vector",
        createdAt: "Uploaded 5 days ago",
    },    
    {
        id: 6,
        imageURL: "https://www.svgrepo.com/show/505207/fries.svg",
        fileName: "Fries_SVG _Vector",
        createdAt: "Uploaded 2 days ago",
    },
    {
        id: 7,
        imageURL: "https://www.svgrepo.com/show/505205/roast-chicken.svg",
        fileName: "Roast_chicken_SVG _Vector",
        createdAt: "Uploaded 2 weeks ago",
    },    
    {
        id: 8,
        imageURL: "https://www.svgrepo.com/show/505204/ice-cream.svg",
        fileName: "Ice_cream_SVG _Vector",
        createdAt: "Uploaded 1 days ago",
    },
    {
        id: 9,
        imageURL: "https://www.svgrepo.com/show/505213/pizza.svg",
        fileName: "Pizza_SVG _Vector",
        createdAt: "Uploaded 7 weeks ago",
    },   
    {
        id: 10,
        imageURL: "https://www.svgrepo.com/show/505209/egg.svg",
        fileName: "Egg_SVG _Vector",
        createdAt: "Uploaded 9 weeks ago",
    },
    {
        id: 11,
        imageURL: "https://www.svgrepo.com/show/505211/tangerine.svg",
        fileName: "Tangerine_SVG _Vector",
        createdAt: "Uploaded 2 weeks ago",
    }
]

export const users: Array<DataUsersInterface> = [
    {
        id: 1,
        fullName: "Igor",
        email: "igor@gmail.com",
        password: "Qweqwe123!",
        isAdmin: true,
        isAuth: true,
        avatar: "https://img.freepik.com/premium-vector/cat-head-colorful-gradient-logo-vector_334862-14.jpg?w=826"
    },
    {
        id: 2,
        fullName: "Franik",
        email: "franik@gmail.com",
        password: "Qweqwe321#",
        isAdmin: false,
        isAuth: true,
        avatar: "https://img.freepik.com/premium-vector/apes-monkey-head-colorful-gradient-logo-vector_334862-10.jpg?w=826"
    },
]
