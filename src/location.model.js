const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a title for the location."]
        },

        description: {
            type: String,
            required: [true, "Please enter a description for the location."]
        },

        address: {
            type: String,
            required: [true, "Please enter a valid address."]
        },

        zipCode: {
            type: Number,
            required: [true, "Please enter a valid zip code."]
        },

        city: {
            type: String,
            required: true
        },

        lat: {
            type: Number,
            required: true
        },

        lon: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: [true, "Select a category."]
        },

        image: {
            type: String,
            required: false
        }
    }
)

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;