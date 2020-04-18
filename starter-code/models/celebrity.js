const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema ({
    name: String,
    occupation: {
        type: String,
        enum : ["actor", "singer", "comedian", "mad scientist", "unknown"],
    },
    catchPhrase : String,
});

const Celebrity = mongoose.model("Celebrities", celebritySchema);

module.exports= Celebrity;