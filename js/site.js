/**
 * Created by turner on 6/26/15.
 */
var scarpa = (function (scarpa) {

    scarpa.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    scarpa.datasource = function (doShuffle) {

        if (!doShuffle) {
            return scarpa.alphabet;
        } else {
           return d3.shuffle(scarpa.alphabet).slice(0, Math.floor(Math.random() * scarpa.alphabet.length)).sort();
        }
    };

    return scarpa;
})(scarpa || {});

function letsGo() {

    var svg = doSVG();

    update(svg, scarpa.datasource(false));

    setInterval(function() {
        update(svg, scarpa.datasource(true));
    }, 2000);

    function update(svgContainer, data) {

        var en,
            up,
            ex;

        // enter and exit are appendages to update
        up = svgContainer.selectAll("text").data(data);
        en = up.enter();
        ex = up.exit();

        // UPDATE
        // Update old elements as needed.
        up
            //.attr("fill", "white")
            //.transition().delay(250).duration(2500)
            .attr("fill", "#525252");

        // ENTER
        // Create new elements as needed. Here, appending to the enter selection
        // expands the update selection to include entering elements
        en.append("text")
            //.attr("fill", "white")
            //.transition().delay(500).duration(2500)
            .attr("fill", "#3ADD0F")
            .attr("x", function(d, i) { return i * 32; })
            .attr("dy", ".25em")
            .text(function(d) { return d; });

        // ENTER + UPDATE
        // Operations on the update selection apply to both enter-ing and update-ing
        // nodes.
        up.text(function(d) { return d; });

        // EXIT
        // Remove old elements as needed.
        //text.exit().remove();
        ex
            .transition().delay(750).duration(1000)
            .attr("fill", "red")
            .remove();
    }

    function doSVG () {

        var svg;

        var width = 960,
            height = 500;

        svg = d3.select(".viewport").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(32," + (height / 2) + ")");

        return svg;
    }

}
