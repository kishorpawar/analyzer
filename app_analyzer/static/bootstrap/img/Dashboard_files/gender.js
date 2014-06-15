$(".nav li:first-child").addClass("active")
$(document).ready(function(){
	var gen_link = ".sidebar .nav-sidebar #gender_link"
	console.log(gen_link)
	$(gen_link).click(function()
	{	
		console.log("opening gender page. ")
		console.log($(gen_link).parent())
		remove_active_menu()
		$(gen_link).parent().addClass("active")
		alert("opening gender page.")
		$.ajax({
//		  url: 'api/an_v1/personal/',
		  url: 'gender/'
		  type: 'GET',
		  accepts: 'application/json',
		  dataType: 'json'
		})
	})
	
	function remove_active_menu()
	{
		console.log("removing active class")
		$(".active").removeClass("active")
	}

})