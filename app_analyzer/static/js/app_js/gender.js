$(document).ready(function(){
	$(".nav li:first-child").addClass("active")
	var gen_link = ".sidebar .nav-sidebar #gender_link"
	$(gen_link).click(function()
	{	
		$(".placeholders").html("")
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
				 var men = 0
				 var women = 0
				 for(i=0;i<data.objects.length;i++)
				 {
					 if (data.objects[i].gender=="M")
						 men = men + 1;
					 else if(data.objects[i].gender=="F")
						 women = women + 1;
				 }
				 circleRadii = [men, women]
				 
				 var xscale = d3.scale.linear()
				    			.domain([0, d3.max(circleRadii)])
				    			.range([0, 420]);
				 
				 d3.select(".placeholders")
				   .selectAll("div")
				   .data(circleRadii)
				   .enter().append("div")
				   .attr("id", function(d){return (circleRadii.indexOf(d)==0) ? "men" : "women";})
				   .style("width", function(d) { return xscale(d)+ "px"; })
				   .text(function(d) {return (circleRadii.indexOf(d)==0) ? d + " men" : d +" women"; });
				 
				 fetchData()
	 	  }
		})
	})
	
	function remove_active_menu()
	{
		$(".active").removeClass("active")
	}
	
	function fetchData()
	{
		male_holder = "div#men" 
		female_holder = "div#women"
		gender_holder = ".placeholders > div"
		$(gender_holder).click(function()
		{	
			$(".placeholders").html("")
			selected_div = $(this).attr("id")
			console.log(selected_div)
			var data ;
			$.ajax({
			  url: 'api/an_v1/personal/?limit=0',
			  data:data,
			  type: 'GET',
			  accepts: 'application/json',
			  dataType: 'json',
			  success:function(data)
			  {
				 var fields = ["First Name", 
				               "Last Name", 
				               "Date of Birth", 
				               "Preffered Contact"]
				 var male_values = new Array()
				 var female_values = new Array()
				 var matrix = new Array()
//				 matrix.push(fields)
				 
				 for(i=0;i<data.objects.length;i++)
				 {
					 if (selected_div=="men" & data.objects[i].gender=="M")
						 matrix.push([
						              data.objects[i].first_name,
						              data.objects[i].last_name,
						              data.objects[i].date_of_birth,
						              data.objects[i].preffered_contact])
					 else if(selected_div=="women" & data.objects[i].gender=="F")
						 matrix.push([
						              data.objects[i].first_name,
						              data.objects[i].last_name,
						              data.objects[i].date_of_birth,
						              data.objects[i].preffered_contact,])
				 }

				 console.log(matrix)
				 var table = d3.select("#table > table")
				 				.selectAll("tr")
				 				.data(fields)
				 				.enter().append("td").append("tr")
				 				.text(function(th){ return th.toString().replace(/,/g, " ") })
				 				.data(matrix)
				 				.enter().append("td")
				 				.text(function(th){ return th.toString().replace(/,/g, " ") })
			  }
			})
		})
	}


	var deg_link = ".sidebar .nav-sidebar #degree_link"
	$(deg_link).click(function()
	{	
		$(".placeholders").html("")
		var data ;
		remove_active_menu()
		$(deg_link).parent().addClass("active")
		$.ajax({
		  url: 'api/an_v1/admission/?limit=0',
		  data:data,
		  type: 'GET',
		  accepts: 'application/json',
		  dataType: 'json',
		  success:function(data)
		  {
			
			  mast = doct = 0
			  for(i=0;i<data.objects.length;i++)
			  {
				  if(data.objects[i].degree == "MASTERS")
					  mast += 1;
				  else if(data.objects[i].degree == "DOCTORAL")
					  doct += 1;
			  }
			  
			  data = [{"label":"MASTERS", "value":mast}, 
			          {"label":"DOCTOROL", "value":doct}] 
			  console.log(data)

			  var w = 480,                        
			  h = 480,                            
			  r = 200,                            
			  color = d3.scale.category10();
				
			  var vis = d3.select(".placeholders")
		        		  .append("svg:svg")              
		        		  .data([data])                   
		        		  .attr("width", w)           
		        		  .attr("height", h)
		        		  .append("svg:g")                
		        		  .attr("transform", "translate(" + r + "," + r + ")")			  	
			  
    		  var arc = d3.svg.arc() 
    		  			  .outerRadius(r);
    	 
			  var pie = d3.layout.pie()           
    	        		.value(function(d) { return d.value; }); 
    	 
			  var arcs = vis.selectAll("g.slice")     
    	        		  .data(pie)                          
    	        		  .enter()
    	        		  .append("svg:g")
    	        		  .attr("class", "slice");
    	 
			  arcs.append("svg:path")
			  	  .attr("fill", function(d, i) { return color(i); } )
	              .attr("d", arc);
	 
			  arcs.append("svg:text")
    	          .attr("transform", function(d) {
		        	                d.innerRadius = 0;
		        	                d.outerRadius = r;
		        	                return "translate(" + arc.centroid(d) + ")";
		        	            })
	             .attr("text-anchor", "middle")
	             .text(function(d, i) { return data[i].label +"\t\t\t"+ data[i].value; });
	 	  }
		})
	})


	
	var prog_link = ".sidebar .nav-sidebar #program_link"
	$(prog_link).click(function()
	{	
		$(".placeholders").html("")
		var programs = ["M.P.A","M.A","M.S","M.M","M.F.A","M.N.S",
		                "M.B.A","M.P.A","EMPA","M.S.W","PH.D.B.B.S",
		                "PH.D.B.S","PH.D.B.E","PH.D.Aud","PH.D.C.P.Ed",
		                "PH.D.Eng","PH.D.M.Chem","D.M","D.P.T",
		                "PH.D.P.S","PH.D.P"]
		var data ;
		remove_active_menu()
		$(prog_link).parent().addClass("active")
		$(".placeholders").html("<p>husssh!!!... Need Time to develop this.")
	})

})