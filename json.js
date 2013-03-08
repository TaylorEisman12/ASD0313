$('#autoFillData').on("click", function () {
    localStorage.clear();
    var jsonItems = {
        "items":[
            {
                "playerName" :["Player Name:", "Angel"],
                "playerClass":["Player Class:", "Wizard"],
                "level" :["Level:", "38"],
                "hardcore" :["Hardcore:", "No"],
                "difficulty" :["Difficulty:", "Normal"]
            },
            {
                "playerName" :["Player Name:", "Leslie"],
                "playerClass":["Player Class:", "Barbarian"],
                "level" :["Level:", "60"],
                "hardcore" :["Hardcore:", "Yes"],
                "difficulty" :["Difficulty:", "Inferno"]
            },
            {
                "playerName" :["Player Name:", "Bart"],
                "playerClass":["Player Class:", "Demon Hunter"],
                "level" :["Level:", "60"],
                "hardcore" :["Hardcore:", "No"],
                "difficulty" :["Difficulty:", "Hell"]
            },
            {
                "playerName" :["Player Name:", "Healz"],
                "playerClass":["Player Class:", "Monk"],
                "level" :["Level:", "50"],
                "hardcore" :["Hardcore:", "Yes"],
                "difficulty" :["Difficulty:", "Nightmare"]
            },
            {
                "playName" :["Player Name: ", "Nancy"],
                "playerClass":["Player Class: ", "Witch Doctor"],
                "level" :["Level: ", "29"],
                "hardcore" :["Hardcore: ", "No"],
                "difficulty" :["Difficulty: ", "Normal"]
            }
        ]
    };

    $.each(jsonItems.items, function (index, singleItem) {
        var _id = Math.floor(Math.random() * 100001);
        var toStore = JSON.stringify(singleItem);
        localStorage.setItem(_id, toStore);
        console.log("Player " + index + " saved to local storage with _id = " + _id);
    });
    alert("Dummy data replaced Local Storage.");
});