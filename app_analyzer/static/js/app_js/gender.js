$(document).ready(function(){
	$(".nav li:first-child").addClass("active")
	var gen_link = ".sidebar .nav-sidebar #gender_link"
	$(gen_link).click(function()
	{	
		var data ;
		remove_active_menu()
		$(gen_link).parent().addClass("active")
		$.ajax({
		  url: 'api/an_v1/personal/?limit=0',
		  data:data,
		  type: 'GET',
		  accepts: 'application/json',
		  dataType: 'json',
		  success:function(data)
		  {
			 circleRadii = [40, 20, 10]
//			  console.log(data.objects[0].first_name)
//			 $(".placeholders").html(data.objects[0].first_name)
			 var svgContainer = d3.select(".placeholders").append("svg")
				             .attr("width", 800)
				             .attr("height", 800);
				
			  var circles = svgContainer.selectAll("circle")
			   				 .data()
			   				 .enter()
			   				 .append("circle")
			
			  var circleAttributes = circles
			  				.attr("cx", 200)
			  				.attr("cy", 200)
			  				.attr("r", 200)
			  				.style("fill", "green");
		  }
		})
	})
	
	function remove_active_menu()
	{
		$(".active").removeClass("active")
	}
})