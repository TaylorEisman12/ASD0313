function(doc) {
  if (doc._id.substr(0,4) === "monk" ){
  	emit(doc._id);
  }
};