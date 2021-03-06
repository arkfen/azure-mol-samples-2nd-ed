// This script sample is part of "Learn Azure in a Month of Lunches - 2nd edition" (Manning
// Publications) by Iain Foulds.
//
// This sample script covers the exercises from chapter 21 of the book. For more
// information and context to these commands, read a sample of the book and
// purchase at https://www.manning.com/books/learn-azure-in-a-month-of-lunches-2nd-edition
//
// This script sample is released under the MIT license. For more information,
// see https://github.com/fouldsy/azure-mol-samples-2nd-ed/blob/master/LICENSE

// Every JavaScript Function App starts with exporting a function that
// contains a context object.
// This context object is used to pass data back and forth
module.exports = function (context, req) {

  // Read in message content from Service Bus and decode from base64
  var buffer = new Buffer(req.body.ContentData, 'base64')
  var decodedString = buffer.toString();

  // Create JSON object of decoded Service Bus message
  var objects = JSON.parse(decodedString);

  // Extract recorded temperature from IoT device
  var temperature = objects["temperature"];

  if (req.body.ContentData) {

    // Build response to send back to Logic App
    context.res = {
        body: {
        analysis: "Recorded temperature was  " + (temperature).toFixed(1) + "C!"
        }
    };
  }

  // Output temperature to console log
  context.log("Recorded temperature was " + (temperature).toFixed(1) + "C!");

  // Every JavaScript Function App must end with call to context.done
  // This call tells the Function App that your code is finished
  context.done();
};
