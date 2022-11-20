const express = require("express");
const session = require('express-session');
const {FormModel, UserModel, QuizModel} = require("./models");
const {ResponseCodes} = require("./Helper/ResponseCodes");
const {getResponseMessage} = require("./Helper/Helper");

const app = express();

app.get("/", function (request, response) {

    /*
    * Here we have assigned the 'session' to 'sess'.
    * Now we can create any number of session variables we want.
    * in PHP we do as $_SESSION['var name'].
    * Here we do like this.
    */
    // equivalent to $_SESSION['username'] in PHP.
})


app.get("/login", async function (request, response) {

    try {
        UserModel.findOne({username: request.query.username, password: request.query.password})
            .select('username firstName lastName')
            .exec(function (err, order) {
                if (err) {
                    return next(err);
                } else if (order == null) {
                    response.status(ResponseCodes.ERROR)
                        .send(order);
                } else {
                    session.username = order.username;
                    session.userId = order.id;
                    response.send(order);
                }
            });
    } catch (error) {
        response.status(ResponseCodes.ERROR).send(error);
    }
})

app.get("/quiz", async function (request, response) {

    try {
        if (session.userId == undefined) {
            response.statusCode = ResponseCodes.ERROR;
            response.write(getResponseMessage(ResponseCodes.USER_NOT_LOGGED_IN, 'User not logged in'));
            response.end(); //end the response
            return;
        }

        QuizModel.aggregate([
            {
                $match: {"author": session.userId}
            },
            {
                $lookup: {
                    from: "users", // collection name in db
                    localField: "author",
                    foreignField: "userId",
                    as: "user"
                }
            }]).exec(function (err, quizzes) {

            response.send(quizzes);
        });

        //.populate('users');

    } catch (error) {
        response.status(ResponseCodes.ERROR).send(error);
    }

});

app.get("/form", async (request, response) => {
    try {
        if (session.userId == undefined) {
            response.statusCode = ResponseCodes.ERROR;
            response.write(getResponseMessage(ResponseCodes.USER_NOT_LOGGED_IN, 'User not logged in'));
            response.end(); //end the response
            return;
        }


        const form = await FormModel.find({userId: session.userId});
        response.send(form);
    } catch (error) {
        response.status(ResponseCodes.ERROR).send(error);
    }
});


app.get("/form/add", async (request, response) => {

    try {

        //let original_id = ObjectId();
        //"_id": original_id,
        /*
        const ABCformModel = new FormModel({
            quizHeader: 'ABC',
            creator_user_id: original_id
        });
        ABCformModel.save().then(savedDoc => {
            response.send("Saved" + savedDoc);
        });*/

    } catch (error) {
        response.status(500).send(error);
    }
});


app.get("/user", async (request, response) => {

    const user = await UserModel.find({});

    try {
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});


module.exports = app;