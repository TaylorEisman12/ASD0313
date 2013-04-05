
$("#index header a").on('click', function() { 
    alert("Save a list of your Armors.");
 });
 
 $('#submit').on('click', function () {
 	alert('Armor Saved!');
 	
 });
 
 $('#editButton').on('click', function(){ editArmor() });
 $('#deleteButton').on('click', function() { deleteArmor() });
 
 var editPlayer = function() {
	var nKey = $(this).data('key');
	console.log("key:", nKey);
	$.couch.db('armordb').openDoc(nKey, {
		success: function(data){
			console.log(data);
			$('#armorName').val(data.armorName);
			$('#armorColor').val(data.armorColor);
			$('#repaired').val(data.repaired);
			$('#submit').val("Save changes").attr({'key': data._id, 'rev': data._rev}); 
			$.mobile.changePage('#index');
		}
	});
};

var deleteArmor = function(){
	var itemKey = $(this).data('key');
	console.log("Key:", itemKey);
	var ask = confirm("Are you sure you want to delete this Armor?");
		if(ask === true){	
			$.couch.db('armordb').openDoc(myKey, {		
				success: function(data){
					var item = {};
					item._id = data._id;
					item._rev = data._rev;
					$.couch.db('armordb').removeDoc(item, {
						success: function(data){
							alert('The Armor was deleted.');
						},
						error: function() {
		            	alert('The Armor was not deteled');	
		            	}
					});
		};
		$.mobile.changePage('#index');

};


// 																 //
// jquery.couch.js plugin is not working, will not make a _plugin // 
//																 //
//$('#yellowArmor').on('click', function (){
//    $.couch.db("armordb").view("plugin/yellowArmor", {
//        success: function(data) {
//            $('#armorList').empty();
//            $.each(data.rows, function(index, value) {
//                var item = (value.value || value.doc);
//                $('#armorList').append(
//                    $('<li>').append(
//                        $('<a>')
//                        .attr("href", "#")
//                        .text(item.armorName)
//                    );
//                
//            });
//            $('#armorList').listview('refresh');
//        }
//    });
// });
//$('#blueArmor').on('click', function (){
//    $.couch.db("armordb").view("plugin/blueArmor", {
//        success: function(data) {
//            $('#armorList').empty();
//            $.each(data.rows, function(index, value) {
//                var item = (value.value || value.doc);
//                $('#armorList').append(
//                    $('<li>').append(
//                        $('<a>')
//                        .attr("href", "#")
//                        .text(item.armorName)
//                    );
//                
//            });
//            $('#armorList').listview('refresh');
//        }
//    });
// });
//$('#greenArmor').on('click', function (){
//    $.couch.db("armordb").view("plugin/greenArmor", {
//        success: function(data) {
//            $('#armorList').empty();
//            $.each(data.rows, function(index, value) {
//                var item = (value.value || value.doc);
//                $('#armorList').append(
//                    $('<li>').append(
//                        $('<a>')
//                        .attr("href", "#")
//                        .text(item.armorName)
//                    );
//                
//            });
//            $('#armorList').listview('refresh');
//        }
//    });
// });
//$('#redArmor').on('click', function (){
//    $.couch.db("armordb").view("plugin/redArmor", {
//        success: function(data) {
//            $('#armorList').empty();
//            $.each(data.rows, function(index, value) {
//                var item = (value.value || value.doc);
//                $('#armorList').append(
//                    $('<li>').append(
//                        $('<a>')
//                        .attr("href", "#")
//                        .text(item.armorName)
//                    );
//                
//            });
//            $('#armorList').listview('refresh');
//        }
//    });
// });
 
 $('#blueArmor').on('click', function (){
 	$('#armorList').empty();
	$.ajax({
		"url": "_view/blueArmor",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, value){
				var armorColor = value.value.armorColor;
				var armorName = value.value.armorName;
				var repaired = value.value.repaired;
				$("#armorList").append(
					$('<li>').append(
						$('<a>').attr("href", "armor.html?armor=" + armorName)
						.text(armorName)
					)
				);
			}); $('#armorList').listview('refresh');
		}
	}); 
 });
 
  $('#yellowArmor').on('click', function (){
 	$('#armorList').empty();
	$.ajax({
		"url": "_view/yellowArmor",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, value){
				var armorColor = value.value.armorColor;
				var armorName = value.value.armorName;
				var repaired = value.value.repaired;
				$("#armorList").append(
					$('<li>').append(
						$('<a>').attr("href", "armor.html?armor=" + armorName)
						.text(armorName)
					)
				);
			}); $('#armorList').listview('refresh');
		}
	}); 
 });
 
   $('#greenArmor').on('click', function (){
 	$('#armorList').empty();
	$.ajax({
		"url": "_view/greenArmor",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, value){
				var armorColor = value.value.armorColor;
				var armorName = value.value.armorName;
				var repaired = value.value.repaired;
				$("#armorList").append(
					$('<li>').append(
						$('<a>').attr("href", "armor.html?armor=" + armorName)
						.text(armorName)
					)
				);
			}); $('#armorList').listview('refresh');
		}
	}); 
 });
 
   $('#redArmor').on('click', function (){
 	$('#armorList').empty();
	$.ajax({
		"url": "_view/redArmor",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, value){
				var armorColor = value.value.armorColor;
				var armorName = value.value.armorName;
				var repaired = value.value.repaired;
				$("#armorList").append(
					$('<li>').append(
						$('<a>').attr("href", "armor.html?armor=" + armorName)
						.text(armorName)
					)
				);
			}); $('#armorList').listview('refresh');
		}
	}); 
 });
 
//	var urlVars = function () {
//    	var urlData = $($.mobile.activePage).data("url");
//    	var urlParts = urlData.split('?');
//    	var urlPairs = urlParts[1].split('&');
//    	var urlValues = {};
//    	for (var pair in urlPairs) {
//        	var keyValue = urlPairs[pair].split('=');
//        	var key = decodeURIComponet(keyValue[0]);
//        	var value = decodeURIComponet(keyValue[1]);
//        	urlValues[key] = value;    
//    }
//    return urlValues;
//};

 
//	 $('#armor').on("pageinit", '#armor', function() {
//    	var armor = urlVars()["armor"];
//    	console.log(armor);
//  	  $.couch.db("asdproject").view("plugin/armorViews", {
//    	key: "armor=" + armorName
//    });
//});
 