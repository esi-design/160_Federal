// console.log('test');
// document.addEventListener("deviceready",onDeviceReady,false);


// function onDeviceReady(){
$(document).ready(function(){
/*
	console.log('test');
	$(window).trigger('hashchange');
*/
	render(window.location.hash);
    $.support.cors=true;
    $.mobile.allowCrossDomainPages=true;

    var oReq = new XMLHttpRequest();
    var tokens =[];
    var next =[];
    var info_div;

       // Update time
       setInterval(function(){
            var date = new Date;
            dt = date.toLocaleString();
            $("#dt").html(String(dt));
        },10000);

//================= Page 1 =================//

	// An event handler with calls the render function on every hashchange.
	// The render function will show the appropriate content of out page.
	$(window).on('hashchange', function(){
		console.log('hash change');
		window.scrollTo(0, 0);
		render(window.location.hash);
	});
	
	function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.container .page').removeClass('visible');


		var map = {

			// The Homepage.
			'': function() {
				console.log('nothing');
				renderHome();
			},

			// Single Products page.
			'#page2': function() {
				console.log("page 2");

				// Get the index of which product we want to show and call the appropriate function.
				var index = url.split('/')[0];

				renderPage2();
			},
			
			'#page3': function() {

				// Get the index of which product we want to show and call the appropriate function.
				var index = url.split('/')[0];

				renderPage3();
			},
			
			'#page4': function() {
					console.log('page 4');
				// Get the index of which product we want to show and call the appropriate function.
				var index = url.split('/')[0];

				renderPage4();
			}

		};

		// Execute the needed function depending on the url keyword (stored in temp).
		if(map[temp]){
			map[temp]();
		}
		// If the keyword isn't listed in the above - render the error page.
		else {
			renderErrorPage();
		}

	}

	
	function renderHome() {
		var page = $('#page1');
		console.log("RENDER Home");
		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');
		$(document).on('click', function(e){
			e.preventDefault();
			window.location.hash = '#page2';
		});
	}
	
	function renderPage2() {
		var page = $('#page2');
		console.log("RENDER Page 2");
		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');
		
		$('#page2 input').click(function(){
             jsKeyboard.init("virtualKeyboard");
			 $('.keyboard').fadeIn();
	         //first input focus
	         var $firstInput = $(':input').first().focus();
	         jsKeyboard.currentElement = $firstInput;
	         jsKeyboard.currentElementCursorPosition = 0; 
	         $('#data_Select').animate({height:300});
	     });
	}
	
	function renderPage3(comp,floor) {
		// Hide whatever page is currently shown.
		$('.container .page').removeClass('visible');
		var page = $('#page3');
		var company = comp;
		var floor = floor;
		console.log("RENDER Page 3");
		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
// 		$('#page2').fadeOut();
		page.addClass('visible');
		page.fadeIn();
		$('#company').val(company);
		$('#floor').val(company);
		
/*
		$('#company').click(function(e){
			e.preventDefault();
			window.location.hash = '#page2';
		});
*/
		
		$('#page3 input').click(function(){
             jsKeyboard.init("virtualKeyboard");
			 $('.keyboard').fadeIn();
	         //first input focus
	         var $firstInput = $(':input').first().focus();
	         jsKeyboard.currentElement = $firstInput;
	         jsKeyboard.currentElementCursorPosition = 0; 
	         $('#data_Select').animate({height:300});
	     });
	}
	
	function renderPage4() {
		var page = $('#page4');
		console.log("RENDER Page 4");
		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');
		page.fadeIn();
		$(document).on('click', function(e){
			e.preventDefault();
			window.location.hash = '';
		});
	}
	
	// Shows the error page.
	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}


//================= Page 2 =================//

        //Onload get directory data
        var urlReq ="http://esidesigndev.com/data_Demo/building.php"
        
        connectSql(urlReq);

         // To retrieve data --- Debug button 
         $("#_reqB").click(function () {
            console.log("Ready to Get data");
            var urlReq ="http://esidesigndev.com/data_Demo/building.php"
            connectSql(urlReq);
        });

        //Show the company names and locations in the html element page 2     
        //div page 2
        $('#data_Select').show();
        $('#data_Select_cmpny').hide();
        $('#data_Select__ppl').hide();

        
        //Show ByCompany page 2
        $('#_cmpny').click(function(){
            console.log("Show Company");
            $('#data_Select').hide();
            $('#data_Select_cmpny').show();
            $('#data_Select__ppl').hide();
            getValues('#data_Select_cmpny');
        });
        //Show ByPeople page 2
        $('#_ppl').click(function(){
            console.log("Show people");
            $('#data_Select').hide();
            $('#data_Select_cmpny').hide();
            $('#data_Select__ppl').show();
            getValues('#data_Select__ppl');
        });
        //Show default All page 2
        $('#_all').click(function(){
            console.log("Show All");
            $('#data_Select').show();
            $('#data_Select_cmpny').hide();
            $('#ddata_Select__ppl').hide();
            getValues('#data_Select');
        });

        //To move page 3

        $('#_trdB').click(function(e){

            var Comp_val = $('#searchForCollapsibleSetChildren').val();
            $('#visitor-company').val(Comp_val);
			e.preventDefault();
			window.location.hash = '#page3';
        });




//================= Page 3 =================//

        //  To send form to the data base

        $("#_sndB").click(function(e){
			var company = $("#company").val();
            var visitor = $("#name").val();
            var visitorCompany = $("#visitor-company").val();
            var purpose = $("#purpose").val();
            var urlSnd= "http://esidesigndev.com/data_Demo/guestform.php?company="+company+"&lid="+visitor+"&visitorCompany="+visitorCompany+"&purpose="+purpose;
            connectSql(urlSnd); 
            console.log(name + ","+ location);

            $('#place').text(location);
			e.preventDefault();
			window.location.hash = '#page4';
}); 


 // ================= FUNCTIONS ================= //


// Get the data  -- xhml 

function handler()
{
    if (oReq.readyState == 4 /* complete */) {
        if (oReq.status >= 200 && (oReq.status < 300 || oReq.status === 304)) {
            var bval=oReq.responseText;
            console.log(oReq.status);
            convdata(bval);
        }
        else{
//             navigator.notification.alert("No Internet Connection");
            console.log("error");
        }
    }
}

 // call get data

 function connectSql(data){

    var url = data;

    if (oReq != null) {
        oReq.open("GET", url , true);
        oReq.onreadystatechange = handler;
        oReq.send();
    }
    else {

        window.console.log("AJAX not supported.");
    }
}


// function to convert data into JSON -- Windows doesn't support jQueryAJAX, JSON.parse() or jQuery.parseJSON()

function convdata(data){

    var dt_one = data;
    var key=[],toJson=[],obj=[];

                // Converting data into JSON object

                if (dt_one.length > 11 ){ 

                // Parsing data -- Generate new array "obj" and new JSON "tokens"

                var filter_one= dt_one.replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":'});
                var filter_two = filter_one.replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"'});
                var tnt = filter_two.split(/[{()}]+/);

                for(i in tnt){
                    if( tnt[i].length > 2){
                        key.push(tnt[i]);
                    }
                }
                for(i in key){
                  var values = new Array();
                  var keyOne =key[i].split(/","+/); 
                  for (var j =0; j< keyOne.length; j++){
                    var mkey = keyOne[j].split(":");
                    var mkeytwo = mkey[1];
                    if(mkeytwo!=undefined){   
                        var res = mkeytwo.replace(/"/g, "");
                        if (res.length >= 1){

                            values.push(res);
                        }
                    }
                }
                toJson.push(values);
            }

            for(i in toJson){
                if(toJson[i]!= undefined){
                    obj.push(toJson[i])
                }
            }
            for (i in obj){
              var _company = String(obj[i][2]);
              var _location = String(obj[i][3]);
              var _people = String(obj[i][4]);
              tokens.push({'company': _company , 'location' : _location ,'people':_people});
          }
                                // To filter duplicates
                                for( var i =1;i< obj.length; i++){
                                 if(obj[i][2] != obj[i-1][2]){
                                    next.push(obj[i]);
                                }
                            }
                            getValues('#data_Select');      
                        }

                        else {
                //This is to send data
                console.log("Login Data");
            }
        };

        
// Additional to get data. This is handy for reset the data load


function getValues(data){
    var c_Data= data;
    var c_Name;

    for(i in next){

       var clase ='';
       if (i <= 1){
        clase = 'ui-collapsible ui-first-child'
    }
    if (i == next.length-1){
        clase = 'ui-collapsible ui-last-child'
    }
    else{
        clase = 'ui-collapsible'
    }

    var comp_title =$(document.createElement('h3')).attr({
     'class': "ui-collapsible-heading ui-collapsible-heading-collapsed",
 });
    var spam_a =$(document.createElement('a')).attr({
        'class': 'ui-collapsible-heading-toggle',
        'href': "#"
    }).text(String(next[i][2]));

    var spam_b =$(document.createElement('h4')).attr({
        'id': 'floor',
        'class': 'ui-collapsible-heading-toggle',
                 //href: "#"
             }).text(String(next[i][3]));

    var ul_data = $(document.createElement("ul")).attr({
        'data-role':"listview", 'data-inset':"true",
        'class':"ui-listview",
        'id': "_list",
        'value': next[i][2] + "_Floor_" + next[i][2],
    });
    var comp_name = $(document.createElement("div")).attr({ 
        'data-role':"collapsible",
        'data-collapsed':'false',
        value:next[i][2] ,
        'data-inset': 'false',
        'data-content-theme':"false",
        'class': clase,
    });
    var cont_ul = $(document.createElement('div')).attr({
        'class' :"ui-collapsible-content",
        'aria-hidden' :"false"
    });

    $(comp_name).removeClass("ui-screen-hidden")
    $(comp_title).append(spam_a);
    $(comp_title).append(spam_b);
    $(cont_ul).append(ul_data);
    $(comp_name).append(comp_title);
    $(comp_name).append(cont_ul);

    $(c_Data).append(comp_name);

    var rep = new Array();
    var toSearch = String(next[i][2]);
    rep.push(toSearch);

    $(comp_title).click(function(){
	    console.log(comp_title);
       c_Name = $(this).find('a').text();
       c_Location = $(this).find('h4').text();
       console.log(c_Name);
//        $('#searchForCollapsibleSetChildren').val(c_Name);
// 		window.location.hash = '#page3/' + c_Name;
		renderPage3(c_Name,c_Location);
		
   });

    if(c_Data!='#data_Select_cmpny'){

        for(i in tokens){
            if(tokens[i].company == toSearch){
                if(tokens[i].people!=="undefined"){
                    rep.push(String(tokens[i].people));
                    var clasz = ''
                    if (rep.length <= 2){
                        clasz ='ui-li-static ui-body-inherit ui-first-child'
                    }
                    else{
                        clasz ='ui-li-static ui-body-inherit'
                    }
                    var list = $(document.createElement('li')).attr({
                        'data-filtertext':tokens[i].people,
                        'class':clasz,
                    });
                    var list_link = $(document.createElement('a')).attr({
                        'data-filtertext':tokens[i].people,
                        'class':clasz,
                        'href': '#',
                    }).text(String(tokens[i].people)).val(tokens[i].company);
                    $(list_link).click(function(){
                        c_Name = $(this).val() + "," + $(this).text();
                        console.log(c_Name);
                        $('#searchForCollapsibleSetChildren').val(c_Name);

                    });
                    $(list).append(list_link);
                    $(ul_data).append(list);
                }
            }
        }
    }
    rep.toString();
    var fil_a = rep.toString();  
    var fil_b= fil_a.replace(/,/g," ");
    $(comp_name).attr({'data-filtertext' : fil_b })
}
}
});

// ================= TIMEOUT ================= //
var timeout;
$(document).on("mousemove keydown click touchstart", function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
		console.log('timeout');
         window.location = '';
    }, 1000 * 60 * 3);
}).click();