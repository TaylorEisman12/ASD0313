$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addCharacter').on('pageinit', function(){

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
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

$( '#remoteData' ).on('pageinit', function(){

	 $( '#jsonButton' ).on( 'click', function () {
		$('#viewData').empty();
        $.ajax( {
            url: 'xhr/data.json',
            type: 'GET',
            dataType: 'json',
            success:function ( result ) {
				//console.log(result);
                for ( var i = 0, len = result.characters.length; i < len; i++ ) {
                    var item = result.characters[i];
					console.log(item);
                    $( ' ' + 
					'<div class="contentJSON">' +
						'<ul>' +
							'<li><b>' + item.playerClass[0]   	+ " " + item.playerClass[1] + '</b></li>' +
							'<li>' + item.playerName[0]    	+ " " + item.playerName[1] + '</li>' +
							'<li>' + item.level[0]		   	+ " " + item.level[1] + '</li>' +
							'<li>' + item.hardcore[0]		+ " " + item.hardcore[1] + '</li>' + 
							'<li>' + item.difficulty[0]		+ " " + item.difficulty[1] + '</li>' + 
						'</ul>' + 
					'</div>'
					).appendTo( '#viewData' );
                }
            }
        });
    });

	$( '#xmlButton' ).on( 'click', function() {
		$('#viewData').empty();
        $.ajax( {
            url: 'xhr/data.xml',
            type: 'GET',
            dataType: 'xml',
            success:function ( result ) {
				//console.log(result);
				$(result).find('item').each(function(){
					 var playerClass = $(this).find('playerClass').text();
                     var playerName = $(this).find('playerName').text();
                     var level = $(this).find('level').text();
                     var hardcore = $(this).find('hardcore').text();
                     var difficulty = $(this).find('difficulty').text();
                        $(' '+
                            '<div class="contentXML">' +
                                '<ul>' +
                                    '<li><b>Player Class: ' + playerClass + '</b></li>' +
                                    '<li> Player Name: ' + playerName + '</li>' +
                                    '<li> Level: ' + level + '</li>' +
                                    '<li> Hardcore: ' + hardcore + '</li>' +
                                    '<li> Difficulty: ' + difficulty + '</li>' +
                                    '</ul>' +
                            '</div>'
					).appendTo('#viewData');
				});
            }
        });
    });
	
	
	$( '#csvButton' ).on( 'click', function() {
		$('#viewData').empty();
        $.ajax( {
            url: 'xhr/data.csv',
            type: 'GET',
            dataType: 'text',
            success:function ( result ) {
				//console.log(result);
				var lines = result.split("\n");
				//console.log(lines);
				var dataRow = lines[0];
				var dataCol = dataRow.split(",");
				for (var lineNum = 1; lineNum < lines.length; lineNum++) {
					var row = lines[lineNum];
					var columns = row.split(",");
					//console.log(columns);
					$(''+
							'<div class="contentCSV">'+
								'<ul>' +
									'<li><b>' + dataCol[0] + " " + columns[0] + '</b></li>' +
									'<li>'+ dataCol[1] + " " + columns[1] + '</li>' +
									'<li>'+ dataCol[2] + " " + columns[2] + '</li>' +
									'<li>'+ dataCol[3] + " " + columns[3] + '</li>' +
									'<li>'+ dataCol[4] + " " + columns[4] + '</li>' +
								'</ul>' +
							'</div>'
						).appendTo('#viewData');
				}
            }
        });
    });

});