const mongoose = require("mongoose");
const ValidCategories = ["food", "health", "housing", "sport", "education", "transportation", "other"];

const costSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        day: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            transform: (category) =>category.toLowerCase(),
            validate: (category) => ValidCategories.includes(category.toLowerCase()),
        },
        sum: {
            type: Number,
            required: true,
        },
        id: {
            type: String,
            default: () => {
                return Math.ceil(Math.random() * 100000000).toString();
            },
        },
    },

    {
        collection: "costs"
    },
);
const Cost = mongoose.model("Cost", costSchema);

const reportEntryType = {
    day: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
};

const reportSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        food: [reportEntryType],
        health: [reportEntryType],
        housing: [reportEntryType],
        sport: [reportEntryType],
        education: [reportEntryType],
        transportation: [reportEntryType],
        other: [reportEntryType],
    },

    {
        collection: "reports"
    },
);
const Report = mongoose.model("Report", reportSchema);

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },

    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },

    birthday: {
        type: Date,
        required: true,
    },
});
const User = mongoose.model("User", userSchema);

module.exports = {Cost: Cost, Report: Report};
