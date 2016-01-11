var w = parseInt(d3.select(".container").style("width"), 10);

var windowWidth = $(window).width();

var margin = {top: 20, right: 15, bottom: 30, left: 50},
    width = w - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var parseDate = d3.time.format("%y").parse;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(-height,0,0)
    .tickValues([2004,2006,2008,2010,2012,2014])
    .tickFormat(d3.format("d"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(-windowWidth,0,0);

var area = d3.svg.area()
    .x(function(d) { return x(d.year); })
    .y0(height/2)
    .y1(function(d) { return y(d.increase_rate); });

var line = d3.svg.line()
     .x(function(d) { return x(d.year); })
     .y(function(d) { return y(d.increase_rate); });


d3.csv("data.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.year = +d.year;
    d.incrase_rate = +d.increase_rate;
  });


  // draw the Hong Kong chart

  var svg_hk = d3.select("#graphic1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_hk = data.filter(function(d,i){
    if (d.country_code === "HKG" & d.year >= 2004){
        return d;
    }
  });

  var x_hk = d3.scale.linear()
    .range([0, width])
    .domain([2004,2015]);


  var xAxis_hk = d3.svg.axis()
    .scale(x_hk)
    .orient("bottom")
    .tickSize(-height,0,0)
    .tickValues([2004,2006,2008,2010,2012,2014])
    .tickFormat(d3.format("d"));

 
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  var area_hk = d3.svg.area()
    .x(function(d) { return x_hk(d.year); })
    .y0(height/2)
    .y1(function(d) { return y(d.increase_rate); });

var line_hk = d3.svg.line()
     .x(function(d) { return x_hk(d.year); })
     .y(function(d) { return y(d.increase_rate); });

  svg_hk.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis_hk);

  svg_hk.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_hk.append("path")
      .datum(data_hk)
      .attr("class", "area")
      .attr("d", area_hk)
      .style("fill","#9e2f50");


  svg_hk.append("path")
      .datum(data_hk)
      .attr("class", "line")
      .attr("d",line_hk)

  svg_hk.append("line")
  	.attr("x1", function(){
  		return x_hk(2014)
  	})
  	.attr("y1",function(){
  		return y(15.958655)
  	})
  	.attr("x2", function(){
  		return x_hk(2015)
  	})
  	.attr("y2",function(){
  		return y(-1.5)
  	})
  	.attr("stroke-width", 1.5)
    .attr("stroke", "black")
    .attr("id","line_hk")
    .style("stroke-dasharray",("2,2"));

  svg_hk.append("text")
    .text("Protests against mainland tourists")
    .style("text-anchor","end")
    .attr("x", function(){
      return x_hk(2015)
    })
    .attr("y",function(){
      return y(-16)
    })
    .attr("font-size",11)
    .attr("transform", "translate(" + 15 + "," + 0 + ")")
    .attr("id","note_hk1");

  svg_hk.append("line")
    .attr("x1", function(){
      return x_hk(2015)
    })
    .attr("y1",function(){
      return y(-3)
    })
    .attr("x2", function(){
      return x_hk(2015)
    })
    .attr("y2",function(){
      return y(-9)
    })
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("id","line_hk1");

  
// draw the Macao chart

 var svg_mk = d3.select("#graphic2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_mk = data.filter(function(d,i){
    if (d.country_code === "MAC" & d.year >= 2004){
        return d;
    }
  });

  x.domain([2004,2014]);
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  svg_mk.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_mk.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_mk.append("path")
      .datum(data_mk)
      .attr("class", "area")
      .attr("d", area)
      .style("fill","#9e2f50");

  svg_mk.append("path")
      .datum(data_mk)
      .attr("class", "line")
      .attr("d", line);

// draw the South Korea chart

 var svg_sk = d3.select("#graphic3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_sk = data.filter(function(d,i){
    if (d.country_code === "KOR" & d.year >= 2004){
        return d;
    }
  });

  x.domain([2004,2014]);
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  svg_sk.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_sk.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_sk.append("path")
      .datum(data_sk)
      .attr("class", "area")
      .attr("d", area)
      .style("fill","#9e2f50");

  svg_sk.append("path")
      .datum(data_sk)
      .attr("class", "line")
      .attr("d", line);


// draw the Thailand chart

 var svg_th = d3.select("#graphic4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_th = data.filter(function(d,i){
    if (d.country_code === "THA" & d.year >= 2004){
        return d;
    }
  });

  x.domain([2004,2014]);
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  svg_th.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_th.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_th.append("path")
      .datum(data_th)
      .attr("class", "area")
      .attr("d", area)
      .style("fill","#9e2f50");

  svg_th.append("path")
      .datum(data_th)
      .attr("class", "line")
      .attr("d", line);

  svg_th.append("text")
    .text("2006 Thai coup d'état")
    .style("text-anchor","middle")
    .attr("x", function(){
      return x(2006)
    })
    .attr("y",function(){
      return y(35)
    })
    .attr("font-size",11)
    .attr("id","note_th1");

  svg_th.append("line")
    .attr("x1", function(){
      return x(2006)
    })
    .attr("y1",function(){
      return y(25)
    })
    .attr("x2", function(){
      return x(2006)
    })
    .attr("y2",function(){
      return y(33)
    })
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("id","line_th1");

  svg_th.append("text")
  	.text("The film Lost in Thailand released")
  	.style("text-anchor","middle")
  	.attr("x", function(){
  		return x(2012)
  	})
  	.attr("y",function(){
  		return y(70)
  	})
  	.attr("font-size",11)
    .attr("transform", "translate(" + -25 + "," + 0 + ")")
  	.attr("id","note_th2");

  svg_th.append("line")
  	.attr("x1", function(){
  		return x(2012)
  	})
  	.attr("y1",function(){
  		return y(68)
  	})
  	.attr("x2", function(){
  		return x(2012)
  	})
  	.attr("y2",function(){
  		return y(63)
  	})
  	.attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("id","line_th2");

  svg_th.append("text")
    .text("2014 Thai coup d'état")
    .style("text-anchor","end")
    .attr("x", function(){
      return x(2014)
    })
    .attr("y",function(){
      return y(-20)
    })
    .attr("font-size",11)
    .attr("transform", "translate(" + 15 + "," + 0 + ")")
    .attr("id","note_th3");

  svg_th.append("line")
    .attr("x1", function(){
      return x(2014)
    })
    .attr("y1",function(){
      return y(-2)
    })
    .attr("x2", function(){
      return x(2014)
    })
    .attr("y2",function(){
      return y(-12)
    })
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("id","line_th3");

 
  // draw the Taiwan chart, using a different range

 var svg_tw = d3.select("#graphic5").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height * 2 + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_tw = data.filter(function(d,i){
    if (d.country === "Taiwan" & d.year >= 2009){
        return d;
    }
  });

  var y_tw = d3.scale.linear()
    .range([height * 2, 0])
    .domain([0,210]);

 var xAxis_tw = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(-height * 2,0,0)
    .tickValues([2004,2006,2008,2010,2012,2014])
    .tickFormat(d3.format("d"));

var yAxis_tw = d3.svg.axis()
    .scale(y_tw)
    .orient("left")
    .tickSize(-windowWidth,0,0)
    .tickValues([200, 150, 100, 50]);

var area_tw = d3.svg.area()
    .x(function(d) { return x(d.year); })
    .y0(height * 2)
    .y1(function(d) { return y_tw(d.increase_rate); });

var line_tw = d3.svg.line()
     .x(function(d) { return x(d.year); })
     .y(function(d) { return y_tw(d.increase_rate); });

  svg_tw.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height * 2 + ")")
      .call(xAxis_tw);

  svg_tw.append("g")
      .attr("class", "y axis")
      .call(yAxis_tw)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_tw.append("path")
      .datum(data_tw)
      .attr("class", "area")
      .attr("d", area_tw)
      .style("fill","#9e2f50");

  svg_tw.append("path")
      .datum(data_tw)
      .attr("class", "line")
      .attr("d", line_tw);



  // draw the Japan chart

 var svg_jp = d3.select("#graphic6").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_jp = data.filter(function(d,i){
    if (d.country_code === "JPN" & d.year >= 2004){
        return d;
    }
  });


  x.domain([2004,2014]);
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  svg_jp.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_jp.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_jp.append("path")
      .datum(data_jp)
      .attr("class", "area")
      .attr("d", area)
      .style("fill","#9e2f50");

  svg_jp.append("path")
      .datum(data_jp)
      .attr("class", "line")
      .attr("d", line);

  svg_jp.append("text")
    .text("2011 Tōhoku earthquake")
    .style("text-anchor","middle")
    .attr("x", function(){
      return x(2011)
    })
    .attr("y",function(){
      return y(-50)
    })
    .attr("font-size",11)
    .attr("id","note_jp1");

  svg_jp.append("line")
    .attr("x1", function(){
      return x(2011)
    })
    .attr("y1",function(){
      return y(-28)
    })
    .attr("x2", function(){
      return x(2011)
    })
    .attr("y2",function(){
      return y(-45)
    })
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("id","line_jp1");



  // draw the United States chart

 var svg_us = d3.select("#graphic7").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_us = data.filter(function(d,i){
    if (d.country_code === "USA" & d.year >= 2004){
        return d;
    }
  });


  x.domain([2004,2014]);
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  svg_us.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_us.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_us.append("path")
      .datum(data_us)
      .attr("class", "area")
      .attr("d", area)
      .style("fill","#9e2f50");

  svg_us.append("path")
      .datum(data_us)
      .attr("class", "line")
      .attr("d", line);


   // draw the Vietnam chart

 var svg_vt = d3.select("#graphic8").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_vt = data.filter(function(d,i){
    if (d.country_code === "VNM" & d.year >= 2004){
        return d;
    }
  });


  x.domain([2004,2014]);
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  svg_vt.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_vt.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_vt.append("path")
      .datum(data_vt)
      .attr("class", "area")
      .attr("d", area)
      .style("fill","#9e2f50");

  svg_vt.append("path")
      .datum(data_vt)
      .attr("class", "line")
      .attr("d", line);

   // draw the Malaysia chart

 var svg_ms = d3.select("#graphic9").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_ms = data.filter(function(d,i){
    if (d.country_code === "MYS" & d.year >= 2004){
        return d;
    }
  });


  x.domain([2004,2014]);
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  svg_ms.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_ms.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_ms.append("path")
      .datum(data_ms)
      .attr("class", "area")
      .attr("d", area)
      .style("fill","#9e2f50");

  svg_ms.append("path")
      .datum(data_ms)
      .attr("class", "line")
      .attr("d", line);


   // draw the Russia chart

 var svg_rs = d3.select("#graphic10").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data_rs = data.filter(function(d,i){
    if (d.country_code === "RUS" & d.year >= 2004){
        return d;
    }
  });


  x.domain([2004,2014]);
  y.domain([-60,60]);

  yAxis.tickValues([50, 25, 0, -25, -50]);

  svg_rs.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_rs.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Increase rate")
      .style("font-size","12");

  svg_rs.append("path")
      .datum(data_rs)
      .attr("class", "area")
      .attr("d", area)
      .style("fill","#9e2f50");

  svg_rs.append("path")
      .datum(data_rs)
      .attr("class", "line")
      .attr("d", line);



  d3.select(window).on("resize", resize);

    function resize() {
        // update width
        w = parseInt(d3.select(".container").style("width"), 10);
        width = w - margin.left - margin.right;


        // resize the chart
        x.range([0, width]);
        y.domain([-60,60])

        d3.select(svg_hk.node().parentNode)
            .style("width", (width + margin.left + margin.right) + "px");

        x_hk.range([0,width])
        	.domain([2004,2015]);

        svg_hk.selectAll(".area")
            .attr("d", area_hk);

        svg_hk.selectAll(".line")
            .attr("d",line_hk);

        svg_hk.select("#line_hk")
		  	.attr("x1", function(){
		  		return x_hk(2014)
		  	})
		  	.attr("y1",function(){
		  		return y(15.958655)
		  	})
		  	.attr("x2", function(){
		  		return x_hk(2015)
		  	})
		  	.attr("y2",function(){
		  		return y(-1.5)
		  	});

        svg_hk.select("#note_hk1")
          .attr("x", function(){  
            return x_hk(2015)
          });

        svg_hk.select("#line_hk1") 
        .attr("x1", function(){
          return x_hk(2015)
        })
        .attr("x2", function(){
          return x_hk(2015)
        });
       
  

        svg_hk.select("g").call(xAxis_hk.orient("bottom"));


        // d3.select(svg_mk.node().parentNode)
        //     .style("width", (width + margin.left + margin.right) + "px");
       
        // svg_mk.selectAll(".area")
        //     .attr("d", area);

        // svg_mk.selectAll(".line")
        //     .attr("d",line)

        // svg_mk.select("g").call(xAxis.orient("bottom"));


        d3.select(svg_sk.node().parentNode)
            .style("width", (width + margin.left + margin.right) + "px");
       
        svg_sk.selectAll(".area")
            .attr("d", area);

        svg_sk.selectAll(".line")
            .attr("d",line)

        svg_sk.select("g").call(xAxis.orient("bottom"));


        d3.select(svg_th.node().parentNode)
            .style("width", (width + margin.left + margin.right) + "px");
       
        svg_th.selectAll(".area")
            .attr("d", area);

        svg_th.selectAll(".line")
            .attr("d",line);

        svg_th.select("#note_th1")  
        .attr("x", function(){
          return x(2006)
        });
       svg_th.select("#line_th1")
        .attr("x1", function(){
          return x(2006)
        })
        .attr("x2", function(){
          return x(2006)
        });
    
        svg_th.select("#note_th2")	
		  	.attr("x", function(){
		  		return x(2012)
		  	});

		   svg_th.select("#line_th2")
		  	.attr("x1", function(){
		  		return x(2012)
		  	})
		  	.attr("x2", function(){
		  		return x(2012)
		  	});

        svg_th.select("#note_th3")
          .attr("x", function(){
            return x(2014)
          });
       
        svg_th.select("#line_th3")
          .attr("x1", function(){
            return x(2014)
          })
          .attr("x2", function(){
            return x(2014)
          });
          


        svg_th.select("g").call(xAxis.orient("bottom"));



        d3.select(svg_tw.node().parentNode)
            .style("width", (width + margin.left + margin.right) + "px");
        y_tw.domain([0,210])

        svg_tw.selectAll(".area")
            .attr("d", area_tw);

        svg_tw.selectAll(".line")
            .attr("d",line_tw)

        svg_tw.select("g").call(xAxis_tw.orient("bottom"));


        d3.select(svg_jp.node().parentNode)
            .style("width", (width + margin.left + margin.right) + "px");
       
        svg_jp.selectAll(".area")
            .attr("d", area);

        svg_jp.selectAll(".line")
            .attr("d",line)


        svg_jp.select("#note_jp1")
          .attr("x", function(){
            return x(2011)
          });
       
        svg_jp.select("#line_jp1")
          .attr("x1", function(){
            return x(2011)
          })
          .attr("x2", function(){
            return x(2011)
          });
          

        svg_jp.select("g").call(xAxis.orient("bottom"));


        d3.select(svg_us.node().parentNode)
            .style("width", (width + margin.left + margin.right) + "px");
       
        svg_us.selectAll(".area")
            .attr("d", area);

        svg_us.selectAll(".line")
            .attr("d",line)

        svg_us.select("g").call(xAxis.orient("bottom"));


        // d3.select(svg_vt.node().parentNode)
        //     .style("width", (width + margin.left + margin.right) + "px");
       
        // svg_vt.selectAll(".area")
        //     .attr("d", area);

        // svg_vt.selectAll(".line")
        //     .attr("d",line)

        // svg_vt.select("g").call(xAxis.orient("bottom"));


        d3.select(svg_ms.node().parentNode)
            .style("width", (width + margin.left + margin.right) + "px");
       
        svg_ms.selectAll(".area")
            .attr("d", area);

        svg_ms.selectAll(".line")
            .attr("d",line)

        svg_ms.select("g").call(xAxis.orient("bottom"));


        // d3.select(svg_rs.node().parentNode)
        //     .style("width", (width + margin.left + margin.right) + "px");
       
        // svg_rs.selectAll(".area")
        //     .attr("d", area);

        // svg_rs.selectAll(".line")
        //     .attr("d",line)

        // svg_rs.select("g").call(xAxis.orient("bottom"));

    }

      
});



$(window).load(function () {
    $(window).on("scroll resize", function () {
        var pos = $('#fixed').offset();
        $('.container').each(function () {
            if (pos.top >= $(this).offset().top && pos.top <= $(this).next().offset().top) {
                $('#fixed').html($(this).find('.description').text());
                $(this).css({'opacity': 1});
                $(this).prev().css({'opacity': .4});
                 $(this).next().css({'opacity': .4});

                return; 
            }
        });
    });

    $(document).ready(function () {
        $(window).trigger('scroll'); // init the value
    });

})
