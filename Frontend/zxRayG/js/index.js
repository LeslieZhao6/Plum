

data = [{"name":"levels ","profile_pic":"https://pbs.twimg.com/profile_images/696588888836599808/BuuCzpKH_400x400.jpg","bio":"hello","gender":"m","age":"18","username":"levelsio","interests":{"Dogma":5.85741682,"RT (TV network)":5.776564700000001,"Love":3.09584245,"Elitism":2.46685833,"IOS":2.18541058,"Dude":2.05470854,"HTML":2.00415593},"personality":{"Self-enhancement":0.9320556569099271,"Self-consciousness":0.8962072098077021,"Openness to change":0.8303655671770789,"Melancholy":0.8200627324736529,"Imagination":0.804460138655456,"Hedonism":0.7290164802854462,"Emotional range":0.6989038085172072},"mood":{"anger":0.871165,"sadness":0.081515},"math_c":0.4699194887156235,"math_t":0.08143238831464775,"math_p":0.6017196298154792,"match_persentage":0.08143238831464775,"keywords":["RT (TV network)","Security"]},{"username":"manojpandey", "profile_pic":"https://pbs.twimg.com/profile_images/558088398125035520/SQJjCDhk_400x400.jpeg" , "bio":"dehvchdvchgecd","gender":"F","interests":{"Social media":2.34831337,"Delhi":1.84189178,"India":1.49568422,"Acid throwing":1.26195568,"Knowledge":1.2075414,"RT (TV network)":1.18464753,"Million":1.12173223},"personality":{"Challenge":1.7482541916075869,"Structure":1.3669536125276758,"Openness to change":0.9285726091089084,"Authority-challenging":0.9081003449287914,"Imagination":0.8852422035166302,"Openness":0.8696754983405037,"Hedonism":0.8521830782554881},"mood":{"disgust":0.482775,"fear":0.422174},"math_c":0.2497488212523072,"math_t":0.626827648301672,"math_p":0.7825682077011461,"match_persentage":0.626827648301672,"keywords":["RT (TV network)","Social media","India","Delhi","Knowledge"]},{"username":"sciguy14","bio":"dehvchdvchgecd","gender":"F","interests":{"Edwin Jarvis":4.04669014,"Arduino":3.7553716999999995,"Google":2.49157535,"San Francisco":2.2813568400000004,"Home automation":2.2702519800000003,"Book":1.8814743799999998,"Email":1.58954734},"personality":{"Authority-challenging":0.9075544789260555,"Openness":0.8930041341440165,"Conscientiousness":0.8732884685793811,"Imagination":0.8730192247241033,"Achievement striving":0.8527161422811539,"Intellect":0.8332045868700103,"Cautiousness":0.7906262669172739},"mood":{"fear":0.459643,"joy":0.412131},"math_c":0.11982257971124098,"math_t":0.982251354624539,"math_p":0.9200672362778581,"match_persentage":0.982251354624539,"keywords":["RT (TV network)","Industry","Pound sterling","California"]},{"username":"ladygaga","bio":"dehvchdvchgecd","gender":"F","interests":{"Lady Gaga":19.0072483,"RT (TV network)":5.75321423,"Love":5.189201349999999,"Alexander McQueen":4.78250008,"Philip Treacy":3.20744191,"Isabella Blow":3.19835725,"Grammy Award":2.9290391599999994},"personality":{"Conscientiousness":1.5837373954395093,"Artistic interests":0.910401851472273,"Self-efficacy":0.8546478328700888,"Self-discipline":0.8228325326435878,"Sympathy":0.7880709293178939,"Structure":0.7686495849857657,"Cautiousness":0.7392598435767562},"mood":{"joy":0.863199,"sadness":0.092535},"math_c":0.23338594693994247,"math_t":0.5294688879644316,"math_p":0.7993046651779138,"match_persentage":0.5294688879644316,"keywords":["RT (TV network)","Student","Huntingtin"]}]


function getCard(i)
{
	var strVar="";
strVar += " <!-- Card widget -->";
strVar += "<div class=\"card data-card-menu"+i+"\"  data-i='"+i+"'   ><!-- Face 2 -->";
strVar += "  <div class=\"card-face face-2\"><!-- Back trigger -->";
strVar += "    <button data-card-back=\"data-card-menu"+i+"\" class=\"card-face__back-button\"><img src=\"http:\/\/imgh.us\/arrow_1.svg\" width=\"19\" height=\"19\" draggable=\"false\"\/><\/button><img src=\"http:\/\/imgh.us\/Likes.png\" width=\"100\" height=\"100\" draggable=\"false\" class=\"card-face__stats\"\/><img src=\"http:\/\/imgh.us\/Followers.png\" width=\"100\" height=\"100\" draggable=\"false\" class=\"card-face__stats\"\/><img src=\"http:\/\/imgh.us\/Views.png\" width=\"100\" height=\"100\" draggable=\"false\" class=\"card-face__stats\"\/><!-- Settings Button --><img src=\"http:\/\/imgh.us\/cog.svg\" width=\"17\" height=\"17\" draggable=\"false\" class=\"card-face__settings-button\"\/>";
strVar += "  <\/div><!-- Face 1 -->";
strVar += "  <div class=\"card-face face-1\"><!-- Menu trigger -->";
strVar += "    <button data-card-menu=\"data-card-menu"+i+"\" class=\"card-face__menu-button\"><img src=\"http:\/\/imgh.us\/dots_1.svg\" width=\"5\" height=\"23\" draggable=\"false\"\/><\/button><!-- Avatar -->";
strVar += "    <div class=\"card-face__avatar\"><!-- Bullet notification --><span class=\"card-face__bullet\">2<\/span><!-- User avatar --><img src=\""+data[i].profile_pic+"\" width=\"110\" height=\"110\" draggable=\"false\"\/><\/div><!-- Name -->";
strVar += "    <h2 class=\"card-face__name\">"+data[i].name+"<\/h2><!-- Title --><span class=\"card-face__title\">"+data[i].bio+"<\/span><!-- Cart Footer -->";


strVar += "    <div class=\"card-face-footer\"><a href=\"https:\/\/twitter.com\/"+data[i].username+"\" target=\"_blank\" class=\"card-face__social\"><img src=\"http:\/\/imgh.us\/twitter.svg\" width=\"36\" height=\"36\" draggable=\"false\"\/><\/a><\/div>";


strVar += "  <\/div>";

strVar += "  <center>";
strVar += "<p style='top:300px; position:relative ; width : 90% ; height:10px '  >Match "+  Math.floor( 10000*data[i].match_persentage ) / 100  +"%</p>"
strVar += "<div class=\"progress\"  style='top:300px; position:relative ; width : 90% ; height:10px ' >";

strVar += "  <div class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+ 100 * data[i].match_persentage +"%\">";
strVar += "    <span class=\"sr-only\">40% Complete (success)<\/span>";
strVar += "  <\/div>";
strVar += "  <\/div>";

strVar += "  <\/center>";



strVar += "<\/div> <br>  " ;

return strVar;
}

function showCards()
{
	for(var i=0; i < data.length ; i++)
		getCard(i)
}


function showModal(i )
{
	$('.p2').css( { width : 100 * data[i].math_c+"%"});
	$('.p1').css( { width : 100 * data[i].math_m+"%"});
	$('.p3').css( { width : 100 * data[i].math_t+"%"});
	$('#myModal').modal('show');
}

(function(){
            var menu_trigger = $("[data-card-menu]");
            var back_trigger = $("[data-card-back]");

            $('.card').click( function(){
            	var i = Number($(this).attr('data-i')) ;

            	showModal(i);
            })

            

            
            menu_trigger.click(function(){

            	var s1 = $(this).attr('data-card-menu');
            	console.log(s1);
                $("." + s1).toggleClass("show-menu");
            });    
               
            back_trigger.click(function(){
            	var s1 = $(this).attr('data-card-back');
                $("." + s1).toggleClass("show-menu");
            });       
        })();