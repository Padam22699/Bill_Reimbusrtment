import Imagepath from "../Assets/Images/Imagepath";


// three types = [food,fuel,medical]
export const Data = [
    {
        id: 1, image: Imagepath.foodfork, title: "Blood Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "999.00", type: "food"
    },
    {
        id: 2, image: Imagepath.Fuel, title: "MRI", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "1550.00", type: "fuel"
    },
    {
        id: 3, image: Imagepath.Medical, title: "Psychotherapy", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "2100.00", type: "medical"
    },
    {
        id: 4, image: Imagepath.Fuel, title: "Pregnancy Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "555.00", type: "fuel"
    },
    {
        id: 5, image: Imagepath.foodfork, title: "Dev D", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "1199.00", type: "food"
    },
    {
        id: 6, image: Imagepath.Fuel, title: "Blood Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "3500.00", type: "fuel"
    },
    {
        id: 7, image: Imagepath.Medical, title: "Blood Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "999.00", type: "medical"
    },
    {
        id: 8, image: Imagepath.foodfork, title: "Blood Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "999.00", type: "food"
    },
    {
        id: 9, image: Imagepath.Fuel, title: "MRI", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "1550.00", type: "fuel"
    },
    {
        id: 10, image: Imagepath.Medical, title: "Psychotherapy", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "2100.00", type: "medical"
    },
    {
        id: 11, image: Imagepath.Fuel, title: "Pregnancy Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "555.00", type: "fuel"
    },
    {
        id: 12, image: Imagepath.foodfork, title: "Dev D", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "1199.00", type: "food"
    },

];

export const camera=[
    {id:1,icon:'image'},
    {id:2,icon:'camera'},
    {id:3,icon:'file'},
]

export const Iconlist = [
    { id: 1, image: Imagepath.medicine, text: "Medical" },
    { id: 2, image: Imagepath.Fuel, text: "Fuel" },
    { id: 3, image: Imagepath.foodfork, text: "Food" },
    { id: 4, image: Imagepath.Others, text: "Others" },
];

// export const ApproveData = [
//     { id: 1, text: "Dev D", texthas: "Has requested to follow you.", time: "55 min ago", Approved: "Approved", status: true },
//     { id: 2, text: "John Smith", texthas: "Has requested to follow you.", time: "40 min ago", Approved: "Approved", status: true },
//     { id: 3, text: "Angel Russell", texthas: "Has requested to follow you.", time: "20 min ago", Approved: "Declined", status: false },
//     { id: 4, text: "Krystal Hawkins", texthas: "Has requested to follow you.", time: "35 min ago", Approved: "Approved", status: true },
//     { id: 5, text: "Anglika Nair", texthas: "Has requested to follow you.", time: "10 min ago", Approved: "Declined", status: false },
//     { id: 6, text: "Sher Khan", texthas: "Has requested to follow you.", time: "19 min ago", Approved: "Declined", status: false },
//     { id: 7, text: "Josh Andrew", texthas: "Has requested to follow you.", time: "47 min ago", Approved: "Approved", status: true },
//     { id: 8, text: "Sam Harper", texthas: "Has requested to follow you.", time: "58 min ago", Approved: "Approved", status: true },
//     { id: 9, text: "Padam Prajapat", texthas: "Has requested to follow you.", time: "1 hour ago", Approved: "Declined", status: false },
//     { id: 10, text: "Abhay Sharma", texthas: "Has requested to follow you.", time: "5 hour ago", Approved: "Approved", status: true },
//     { id: 11, text: "Rani Raj", texthas: "Has requested to follow you.", time: "3 min ago", Approved: "Declined", status: false },
//     { id: 12, text: "Vikram Sharma", texthas: "Has requested to follow you.", time: "7 hour ago", Approved: "Declined", status: false },
//     { id: 13, text: "Mohammad Shabir", texthas: "Has requested to follow you.", time: "2 hour ago", Approved: "Approved", status: true },
//     { id: 14, text: "100kin", texthas: "Has requested to follow you.", time: "9 hour ago", Approved: "Approved", status: true },
// ];

export const ApproveData = [
    {
        id: 1, image: Imagepath.foodfork, title: "Blood Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "999.00", type: "food", status: true
    },
    {
        id: 2, image: Imagepath.Fuel, title: "MRI", Approved: "Declined", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "1550.00", type: "fuel", status: false
    },
    {
        id: 3, image: Imagepath.Medical, title: "Psychotherapy", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "2100.00", type: "medical", status: true
    },
    {
        id: 4, image: Imagepath.Fuel, title: "Pregnancy Test", Approved: "Declined", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "555.00", type: "fuel", status: false
    },
    {
        id: 5, image: Imagepath.foodfork, title: "Dev D", Approved: "Declined", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "1199.00", type: "food", status: false
    },
    {
        id: 6, image: Imagepath.Fuel, title: "Blood Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "3500.00", type: "fuel", status: true
    },
    {
        id: 7, image: Imagepath.Medical, title: "Blood Test", Approved: "Declined", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "999.00", type: "medical", status: false
    },
    {
        id: 8, image: Imagepath.foodfork, title: "Blood Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "999.00", type: "food", status: true
    },
    {
        id: 9, image: Imagepath.Fuel, title: "MRI", Approved: "Declined", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "1550.00", type: "fuel", status: false
    },
    {
        id: 10, image: Imagepath.Medical, title: "Psychotherapy", Approved: "Declined", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "2100.00", type: "medical", status: false
    },
    {
        id: 11, image: Imagepath.Fuel, title: "Pregnancy Test", Approved: "Approved", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "555.00", type: "fuel", status: true
    },
    {
        id: 12, image: Imagepath.foodfork, title: "Dev D", Approved: "Declined", text: "Blue Cross Blue Shield - Emily Hamilt...",
        date: "Mar 27,2022", rupee: "1199.00", type: "food", status: false
    },

];
