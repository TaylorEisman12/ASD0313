function (doc) {
	if(doc._id.substr(0,5) === "demon") {
		emit(doc._id, {
			"playerName": doc.playerName,
			"playerClass": doc.playerClass,
			"level": doc.level,
			"hardcore": doc.hardcore,
			"difficulty": doc.difficulty
		});
	}
};