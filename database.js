const mongoose = require("mongoose");
const models = require("./models")

const ValidCategories = ["food", "health", "housing", "sport", "education", "transportation", "other"];

class Database {
    static async connect() {
        await mongoose.connect(
            "mongodb+srv://eden:edenandyarden@cluster0.v8jphwm.mongodb.net/?retryWrites=true&w=majority");
    };

    static async addCost(user_id, year, month, day, description, category, sum) {
        const cost = new models.Cost({user_id, year, month, day, description, category, sum});
        await cost.save()

        await models.Report.deleteOne({
            user_id: user_id,
            year: year,
            month: month,
        });
    }

    static async createReport(user_id, year, month) {
        const report = new models.Report({
            user_id: user_id,
            year: year,
            month: month,
        });

        for (const category of ValidCategories) {
            const costs = await models.Cost.find({
                user_id: user_id,
                year: year,
                month: month,
                category: category,
            });

            report[category] = [];
            costs.forEach(({day, description, sum}) => report[category].push({day, description, sum}));
        }

        await report.save();
        return report
    }

    static async getReport(user_id, year, month) {
        let report = await models.Report.findOne({
            user_id: user_id,
            year: year,
            month: month,
        });
        if (!report) {
            report = await Database.createReport(user_id, year, month);
        }
        return report;
    }
}
Database.connect().catch((e) => {
    console.error(e);
    process.exit(1);
});

module.exports = Database
