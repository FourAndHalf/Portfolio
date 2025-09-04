import { CardData } from "./schema";

export const headerData = {
    "header": "Documents",
    "subHeader": "Upload the documents related to the construction here for easier access"
}

export const cardData: CardData[] = [
    {
        id: 1,
        title: "Professional License",
        expirableOrNot: true,
        expiryDate: new Date("2024-12-31"),
        daysToExpiry: -35,
        authorizingBody: "State Medical Board"
    },
    {
        id: 2,
        title: "Safety Certification",
        expirableOrNot: true,
        expiryDate: new Date("2025-06-15"),
        daysToExpiry: 180,
        authorizingBody: "OSHA"
    },
    {
        id: 3,
        title: "Company ID Badge",
        expirableOrNot: false,
        expiryDate: new Date("2026-01-01"),
        daysToExpiry: 365,
        authorizingBody: "HR Department"
    },
    {
        id: 4,
        title: "Driver's License",
        expirableOrNot: true,
        expiryDate: new Date("2025-03-20"),
        daysToExpiry: 90,
        authorizingBody: "DMV"
    },
    {
        id: 5,
        title: "Insurance Certificate",
        expirableOrNot: true,
        expiryDate: new Date("2024-11-15"),
        daysToExpiry: 30,
        authorizingBody: "Insurance Company"
    },
    {
        id: 6,
        title: "Background Check",
        expirableOrNot: true,
        expiryDate: new Date("2025-08-10"),
        daysToExpiry: 240,
        authorizingBody: "Security Services"
    },
    {
        id: 7,
        title: "Training Certificate",
        expirableOrNot: true,
        expiryDate: new Date("2025-01-30"),
        daysToExpiry: 60,
        authorizingBody: "Training Institute"
    },
    {
        id: 8,
        title: "Work Permit",
        expirableOrNot: true,
        expiryDate: new Date("2025-12-31"),
        daysToExpiry: 365,
        authorizingBody: "Immigration Office"
    }
];