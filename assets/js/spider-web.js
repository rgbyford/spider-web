var theCobWeb = {
    biggestWeb: {
        item: "comb",
        biggerWeb: {
            items: ["glasses", "paperclip", "bubblegum"],
            smallerWeb: {
                item: "toothbrush",
                tinyWeb: {
                    items: ["toenails", "lint", "wrapper", "homework"]
                }
            }
        },
        otherBigWeb: {
            item: "headphones"
        }
    }
};

$(document).ready(function () {

    var foundItName = "";
    var dontOverwrite = false;

    var itemName = prompt("Item to find:");
    findItem(theCobWeb, itemName);
    alert("Found " + itemName + " in: " + foundItName);
    console.log("Hooray:" + foundItName);


    function findItem(objectToSearch, itemToFind) {
        if ((typeof (objectToSearch)).search("object") < 0) { // is this not an object?
            // note that array of strings (i.e. items) returns object in typeof
            return (objecttoSearch == itemToFind ? true : false);
        }
        if (Array.isArray(objectToSearch)) {
            var arrayOfStrings = objectToSearch;
            for (var i = 0; i < arrayOfStrings.length; i++) {
                if (arrayOfStrings[i] == itemToFind) { // found string in array
                    return (true);
                }
            }
            return (false);
        }
        // get here if not a string or an array of strings - must be an object
        var propNames = Object.getOwnPropertyNames(objectToSearch);
        var arr = Object.keys(objectToSearch);
        var foundIt = false;

        for (var i = 0; i < arr.length; i++) {
            console.log(objectToSearch, Array.isArray(objectToSearch));
            //   console.log(objectToSearch.constructor.toString()); //.match(/string/i);
            //   console.log(objectToSearch instanceof Array);
            //   console.log(typeof (objectToSearch));
            //   console.log($.type(objectToSearch));
            //   console.log(objectToSearch.constructor);
            //   console.log(objectToSearch[propNames[i]]);
            //   console.log(typeof (objectToSearch.length));
            //   console.log((typeof (objectToSearch)).search("object"));
            if ((findItem(objectToSearch[arr[i]], itemToFind)) == true) {
                foundIt = true;
                dontOverwrite = (propNames[i].search("item") >= 0) ? true : false;
                // this is a hack, because I can't figure out how to distinguish
                // an object from an array of strings
                if (dontOverwrite == false) {
                    if (foundItName == "") { // don't overwrite
                        foundItName = propNames[i];
                    }
                }
                break;
            }
        }
        return (foundIt);
    }
});