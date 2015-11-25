
document.addEventListener("deviceready",onDeviceReady,false);


function onDeviceReady(){

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
$('#page1').show();
$('#page2').hide();
$('#page3').hide();
$('#page4').hide();

$('.touch').on("click",function(){
    console.log("to page 2")
    $('#page1').fadeOut();
    $('#page2').fadeIn();
});


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

        $('#_trdB').click(function(){

            var Comp_val = $('#searchForCollapsibleSetChildren').val();
            $('#visitor-company').val(Comp_val);
            $('#page1').hide();
            $('#page2').fadeOut();
            $('#page3').fadeIn();
            $('#page4').hide();
        });




//================= Page 3 =================//

        //  To send form to the data base

        $("#_sndB").click(function(){

            var name = $("#name").val();
            var location = $("#visitor-company").val();
            var urlSnd= "http://esidesigndev.com/data_Demo/guestform.php?lid="+name+"&location="+location;
            connectSql(urlSnd); 
            console.log(name + ","+ location);

            $('#place').text(location);
            $('#page1').hide();
            $('#page2').hide();
            $('#page3').fadeOut();
            $('#page4').fadeIn();
            toReset();

}); 

// ================= Page 4 ================= //


     function toReset(){  

        setTimeout(function(){

    //Set to first Page
                $('#page4').fadeOut();
                $('#page2').hide();
                $('#page3').hide();
                setTimeout(function(){
                    $('#page1').fadeIn();
                },2000);
                
            },10000);

    }


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
            navigator.notification.alert("No Internet Connection");
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
       c_Name = $(this).text();
       console.log(c_Name);
       $('#searchForCollapsibleSetChildren').val(c_Name);
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
}