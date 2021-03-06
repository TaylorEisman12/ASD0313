$(document).on("pageinit", '#player', function() {
    var player = urlVars()['player'];
    console.log(urlData);
    $.couch.db("players").view("plugin/playerViews", {
        key: "Player Name:" + playerName
    });
});

$('#monk').on('click', function (){
    $.couch.db("players").view("plugin/monkPlayers", {
        success: function(data) {
            // console.log(data);
            $('#playerList').empty();
            $.each(data.rows, function(index, value) {
                var item = (value.value || value.doc);
                $('#playerList').append(
                    $('<li>').append(
                        $('<a>')
                        .attr("href", "player.html?player=" + item.playerName)
                        .text(item.playerName)//.append(
                            //$('<button/>')
                              //  .text('Delete Player')
                               // .click(function () { 
                                //    deleteItem(); 
                                // });
                        )
                    );
                
            });
            $('#playerList').listview('refresh');
        }
    });
});

var urlVars = function (urlData) {
    var urlData = $($.mobile.activePage).data("url");
    var urlParts = urlData.split('?');
    var urlPairs = urlParts[1].split('&');
    var urlValues = {};
    for (var pair in urlPairs) {
        var keyValue = urlPairs[pair].split('=');
        var key = decodeURIComponet(keyValue[0]);
        var value = decodeURIComponet(keyValue[1]);
        urlValues[key] = value;    
    }
    return urlValues;
};

var editPlayer = function() {
	var nKey = $(this).data('key');
	console.log("key:", nKey);
	$.couch.db('players').openDoc(nKey, {
		success: function(data){
			console.log(data);
			$('#playerName').val(data.playerName);
			$('#playerClass').val(data.playerClass);
			$('#level').val(data.level);
			$('#hardcore').val(data.hardcore);
			$('#difficulty').val(data.difficulty);
			$('#submit').val("Save changes").attr({'key': data._id, 'rev': data._rev}); 
			$.mobile.changePage('#addPlayer');
		}
	});
};



$('#witchDoctor').on('click', function (){
    $.couch.db("players").view("plugin/witchPlayers", {
        success: function(data) {
            // console.log(data);
            $('#playerList').empty();
            $.each(data.rows, function(index, value) {
                var item = (value.value || value.doc);
                $('#playerList').append(
                    $('<li>').append(
                        $('<a>')
                        .attr("href", "player.html")
                        .text(item.playerName)//.append(
                            //$('<button/>')
                              //  .text('Delete Player')
                               // .click(function () { deleteItem(); });
                               
                        )
                    );
            });
            $('#playerList').listview('refresh');
        }
    });
});

$('#barbarian').on('click', function (){
    $.couch.db("players").view("plugin/barbPlayers", {
        success: function(data) {
            // console.log(data);
            $('#playerList').empty();
            $.each(data.rows, function(index, value) {
                var item = (value.value || value.doc);
                $('#playerList').append(
                    $('<li>').append(
                        $('<a>')
                        .attr("href", "player.html")
                        .text(item.playerName)//.append(
                            //$('<button/>')
                              //  .text('Delete Player')
                                //.click(function () { deleteItem(); });
                        )
                    );
                
            });
            $('#playerList').listview('refresh');
        }
    });
});

$('#wizard').on('click', function (){
    $.couch.db("players").view("plugin/wizardPlayers", {
        success: function(data) {
            // console.log(data);
            $('#playerList').empty();
            $.each(data.rows, function(index, value) {
                var item = (value.value || value.doc);
                $('#playerList').append(
                    $('<li>').append(
                        $('<a>')
                        .attr("href", "player.html")
                        .text(item.playerName)//.append(
                          //  $('<button/>')
                            //    .text('Delete Player')
                              //  .click(function () { deleteItem(); });
                        )
                    );
                
            });
            $('#playerList').listview('refresh');
        }
    });
});

$('#demonHunter').on('click', function (){
    $.couch.db("players").view("plugin/Players", {
        success: function(data) {
            // console.log(data);
            $('#playerList').empty();
            $.each(data.rows, function(index, value) {
                var item = (value.value || value.doc);
                $('#playerList').append(
                    $('<li>').append(
                        $('<a>')
                        .attr("href", "player.html")
                        .text(item.playerName).append(
                            $('<button/>')
                                .text('Delete Player')
                                .click(function () { deleteItem(); });
                        )
                    );
                
            });
            $('#playerList').listview('refresh');
        }
    });
});

//    $('#savePlayer').on('click', function(){
 //       $.couch.db("players").saveDoc(this.get('playerName'), {
 //           success: function(playerName) {
 //           console.log(data);
 //           },
  //      error: function(status) {
  //      console.log(status);
  //      }
 //   });
//});
	var deleteItem = function(){
	var itemKey = $(this).data('key');
	console.log("Key:", itemKey);
	var ask = confirm("Are you sure you want to delete this player?");
		if(ask === true){	
			$.couch.db('players').openDoc(myKey, {		
				success: function(data){
					var item = {};
					item._id = data._id;
					item._rev = data._rev;
					$.couch.db('players').removeDoc(item, {
						success: function(data){
							alert('The player was deleted.');
						},
						error: function() {
		            	alert('The player was not deteled');	
		            	}
					});
		};
		$.mobile.changePage('#index');

};

    //$('#deletePlayer').on('click', function(playerName){
     //   $.couch.db("players").removeDoc(this.get('playerName'), {
      //   success: function(playerName) {
     //        console.log(playerName);
     //   },
     //   error: function(status) {
     //   console.log(status);
     //   }
  //  });
//});

$("#index header a").on('click', function() { 
    alert("This app is used to save your Diablo 3 characters with basic details.");
 });
            
$('#addPlayer').on('pageinit', function(){
        var myForm = $('#addPlayer');
            myForm.validate({
            invalidHandler: function(form, validator) {
            },
            submitHandler: function() {
            var data = myForm.serializeArray();
            storeData(data);
        }
    });
    
    //any other code needed for addItem page goes here
    $('#submit').on('click', storeData());    
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
         for ( var n in json )
             {
                 var id = Math.floor( Math.random()*10001 );
                 localStorage.setItem( id, JSON.stringify( json[n] ) );
             }
};

//var getData = function(){
//    $("#viewLocalData").empty();
//       if( localStorage.length === 0 ){
//            alert( "No Saved Players to View." );
//            }
//        for (var i= 0, j=localStorage.length; i<j ; i++){
//            var key = localStorage.key(i);
//            var item = JSON.parse(localStorage.getItem(key));
//            console.log(item);
//            var makeSubList = $("<li></li>");
//            var makeSubLi = $( "<h3>"+item.playerClass[1]+"</h3>"+
//                "<p>"+item.level[1]+"</p>"+
//                "<p>"+item.playerName[1]+"</p>" +
//                "<p>"+item.hardcore[1]+"</p>"+
//                "<p>"+item.difficulty[1]);
//            var makeLink = $("<a href='#' id='"+key+"'>Edit</a>");
//            makeLink.on('click', function(){
//                console.log("This is my key: "+this.id);
//            });
//            makeLink.html(makeSubLi);
//            makeSubList.append(makeLink).appendTo("#viewLocalData");
//        };
//        //$("ul").listview('refresh');
//};

var storeData = function(key){
        if ( !key )
        {
            var id = Math.floor( Math.random() * 10001 );
        }else {
            id = key;
        }
        var item = {};
            item.playerClass = ["Player Class:" , $( '#playerClass' ).val()];
            item.playerName = ["Player Name:" , $( '#playerName' ).val()];
            item.level = ["Level:" , $( '#level' ).val()];
            item.hardcore = ["Hardcore:" , $( '#hardcore' ).val()];
            item.difficulty = ["Difficulty:" , $( '#difficulty' ).val()];
			  $.couch.db('players').saveDoc(item, {
	       			success: function(data){
		      		alert("Player saved.");
};
                    
//var clearLocal = function(){
  //      if( localStorage.length === 0 ){
    //        alert( "No Saved Players." );
      //      }else{
        //        localStorage.clear();
          //      alert( "All Players were Deleted!" );
            //    window.location.reload();
              //  return false;
           // }
//};

// $( '#localStorage' ).on('pageinit', function() {
 //   $( '#deletePlayer' ).on('click', deleteItem);
 //   $( '#showData' ).on('click', getData);
 //   $( '#clearData' ).on('click', clearLocal);
 //   $( '#autoFillData' ).on('click', autofillData);
//});

//$( '#remoteData' ).on('pageinit', function(){
  //   $( '#jsonButton' ).on( 'click', function () {
    //    $('#viewData').empty();
      //  $.ajax( {
        //    url: 'data.json',
          //  type: 'GET',
  //          //dataType: 'json',
 //           success:function ( result ) {
//                //console.log(result);
  //              for ( var i = 0, len = result.characters.length; i < len; i++ ) {
    //                var item = result.characters[i];
      //              console.log(item);
        //            $( ' ' + 
          //          '<div class="contentJSON">' +
            //            '<ul>' +
              //              '<li><b>' + item.playerClass[0]       + " " + item.playerClass[1] + '</b></li>' +
                //            '<li>' + item.playerName[0]        + " " + item.playerName[1] + '</li>' +
                  //          '<li>' + item.level[0]               + " " + item.level[1] + '</li>' +
                    //        '<li>' + item.hardcore[0]        + " " + item.hardcore[1] + '</li>' + 
                      //      '<li>' + item.difficulty[0]        + " " + item.difficulty[1] + '</li>' +
                        //'</ul>' + 
     //               '</div>'
       //             ).appendTo( '#viewData' );
         //       }
 //           }
 //       });
  //  });
//
    //$( '#xmlButton' ).on( 'click', function() {
      //  $('#viewData').empty();
        //$.ajax( {
          //  url: 'data.xml',
            //type: 'GET',
            //dataType: 'xml',
            //success:function ( result ) {
                //console.log(result);
             //   $(result).find('item').each(function(){
               //      var playerClass = $(this).find('playerClass').text();
                 //    var playerName = $(this).find('playerName').text();
                   //  var level = $(this).find('level').text();
                     //var hardcore = $(this).find('hardcore').text();
        //             var difficulty = $(this).find('difficulty').text();
        //                $(' '+
          //                  '<div class="contentXML">' +
            //                    '<ul>' +
              //                      '<li><b>Player Class: ' + playerClass + '</b></li>' +
                //                    '<li> Player Name: ' + playerName + '</li>' +
                  //                  '<li> Level: ' + level + '</li>' +
                    //                '<li> Hardcore: ' + hardcore + '</li>' +
                      //              '<li> Difficulty: ' + difficulty + '</li>' +
                        //            '</ul>' +
    //                        '</div>'
      //              ).appendTo('#viewData');
        //        });
          //  }
    //    });
   // });
    
    
 //   $( '#csvButton' ).on( 'click', function() {
   //     $('#viewData').empty();
     //   $.ajax( {
       //     url: 'data.csv',
         //   type: 'GET',
           // dataType: 'text',
     //       success:function ( result ) {
       //         //console.log(result);
           //     var lines = result.split("\n");
         //       //console.log(lines);
      //          var dataRow = lines[0];
     //           var dataCol = dataRow.split(",");
       //         for (var lineNum = 1; lineNum < lines.length; lineNum++) {
         //           var row = lines[lineNum];
           //         var columns = row.split(",");
             //       //console.log(columns);
               //     $(''+
                 //           '<div class="contentCSV">'+
                   //             '<ul>' +
                     //               '<li><b>' + dataCol[0] + " " + columns[0] + '</b></li>' +
                       //             '<li>'+ dataCol[1] + " " + columns[1] + '</li>' +
                         //           '<li>'+ dataCol[2] + " " + columns[2] + '</li>' +
                           //         '<li>'+ dataCol[3] + " " + columns[3] + '</li>' +
                             //       '<li>'+ dataCol[4] + " " + columns[4] + '</li>' +
                  //              '</ul>' +
                    //        '</div>'
                      //  ).appendTo('#viewData');
     //           }
    //        }
    //    });
   // });

});





