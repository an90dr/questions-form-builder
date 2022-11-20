const mongoose = require("mongoose");
const {Schema} = mongoose;


//Form Schema
const FormSchema = new Schema({
    quizHeader: String,
    creator_user_id: String
});

const FormModel = mongoose.model("Form", FormSchema);

//User Schema
const UserSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    username: String,
    password: String
});

const UserModel = mongoose.model("User", UserSchema);


//Quiz Schema
const QuizSchema = new Schema({
    header: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    }
});

const QuizModel = mongoose.model("Quiz", QuizSchema);

module.exports = {FormModel, UserModel, QuizModel};