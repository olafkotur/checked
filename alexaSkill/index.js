// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
var http = require('http');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Welcome to checked. you can ask where a member is. their most recent comment. their current score. or the temperature of a zone`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const UserLocationHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UserLocation';
    },



    async  handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const fName = slots['firstname'].value;
        const lName = slots['lastname'].value;

        let speakOutput = ` ${fName} ${lName} cannot be found`
        console.log(speakOutput);


        // get all users
        const result = await httpGet('members');

        const members = result.result // array of users

        // find the first and last name from the result
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            if (member.firstName.toLowerCase() === fName.toLowerCase()) {
                if (member.lastName.toLowerCase() === lName.toLowerCase()) {
                    console.log("MEMBER ID: " + member.memberId);
                    const locResult = await httpGet("location/" + member.memberId.toString());
                    console.log("locResult: " + locResult.result.zoneId);
                    const zoneId = locResult.result.zoneId;
                    const zoneResult = await httpGet("zones/" + zoneId);
                    console.log(zoneResult.result);
                    console.log("Stinged: " + JSON.stringify(zoneResult.result));
                    speakOutput = `${fName} ${lName} is in ${zoneResult.result.name}`;
                }
            }
        }




        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const ZoneTempHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LiveTemperature';
    },



    async  handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const zName = slots['zoneName'].value;


        let speakOutput = ` ${zName} cannot be found`
        console.log(speakOutput);



        // get all zones
        const result = await httpGet('zones');

        console.log(result);


        for (let i = 0; i < result.result.length; i++) {
            const zone = result.result[i];
            if (zone.name.toLowerCase() === zName.toLowerCase()) {
                speakOutput = "Match found";
                const sensorResult = await httpGet("live/temperature/" + zone.zoneId, toString());
                console.log(sensorResult);
                speakOutput = `the temperature in ${zName} is ${sensorResult.result.value} degrees`;
            }
        }




        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const MemberRecentCommentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MemberRecentComment';
    },



    async  handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const fName = slots['firstname'].value;
        const lName = slots['lastname'].value;


        let speakOutput = ` ${fName} ${lName} cannot be found`
        console.log(speakOutput);



        // get all users
        const result = await httpGet('members');

        const members = result.result // array of users

        // find the first and last name from the result
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            if (member.firstName.toLowerCase() === fName.toLowerCase()) {
                if (member.lastName.toLowerCase() === lName.toLowerCase()) {
                    console.log("MEMBER ID: " + member.memberId);
                    const commentResult = await httpGet("comments/members/" + member.memberId.toString());
                    console.log("commentResult: " + JSON.stringify(commentResult.result[commentResult.result.length - 1].value));

                    let score = "undefined";

                    const value = JSON.stringify(commentResult.result[commentResult.result.length - 1].rating);

                    console.log(value);

                    if (value === "1") { //red
                        score = "red";
                    }

                    else if (value === "2") { //amber
                        score = "amber";
                    }

                    else if (value === "3") { //green
                        score = "green";
                    }


                    if (value === "0") {
                        speakOutput = `the most recent comment for ${fName} ${lName} is. ${JSON.stringify(commentResult.result[commentResult.result.length - 1].value)}. `;
                    }
                    else {
                        speakOutput = `the most recent comment for ${fName} ${lName} is. ${JSON.stringify(commentResult.result[commentResult.result.length - 1].value)}. And they were given a ${score} rating `;
                    }
                }
            }
        }




        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const MemberScoreHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MemberScore';
    },



    async  handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const fName = slots['firstname'].value;
        const lName = slots['lastname'].value;

        let speakOutput = ` ${fName} ${lName} cannot be found`
        console.log(speakOutput);


        // get all users
        const result = await httpGet('members');

        const members = result.result // array of users

        // find the first and last name from the result
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            if (member.firstName.toLowerCase() === fName.toLowerCase()) {
                if (member.lastName.toLowerCase() === lName.toLowerCase()) {
                    console.log("MEMBER ID: " + member.memberId);
                    const commentResult = await httpGet("comments/members/" + member.memberId.toString());
                    console.log("commentResult: " + JSON.stringify(commentResult.result));

                    let score = 0;

                    for (let i = 0; i < commentResult.result.length; i++) {
                        const value = JSON.stringify(commentResult.result[i].rating);

                        console.log(value);
                        console.log(JSON.stringify(commentResult.result[i]));

                        if (value === "1") { //
                            score = score - 2
                        }

                        else if (value === "2") { //
                            score = score + 0
                        }

                        else if (value === "3") { //
                            score = score + 1
                        }

                    }


                    speakOutput = ` ${fName} ${lName}'s current score is. ${score}`;
                }
            }
        }




        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


function httpGet(uri) {
    return new Promise(((resolve, reject) => {
        var options = {
            host: 'checked-api.herokuapp.com',
            path: '/api/' + uri,
            method: 'GET',
        };

        const request = http.request(options, (response) => {
            response.setEncoding('utf8');
            let returnData = '';

            response.on('data', (chunk) => {
                returnData += chunk;
            });

            response.on('end', () => {
                console.log(returnData);
                resolve(JSON.parse(returnData));
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
        request.end();
    }));
}

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        UserLocationHandler,
        MemberRecentCommentHandler,
        MemberScoreHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        ZoneTempHandler,
        httpGet,
        IntentReflectorHandler,// make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
