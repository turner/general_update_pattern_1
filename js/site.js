/**
 * Created by turner on 6/26/15.
 */

function letsGo() {

    var alphabet = "abcdefghijklmnopqrstuvwxyz".split(""),
        svg = doSVG();

    update(svg, alphabet);

    setInterval(function() {

        update(svg, d3.shuffle(alphabet)
            .slice(0, Math.floor(Math.random() * 26))
            .sort());
    }, 2000);

    function update(svgContainer, data) {

        var en,
            up,
            ex;

        // enter and exit are appendages to update
        up = svgContainer.selectAll("text").data(data);
        en = up.enter();
        ex = up.exit();

        //// UPDATE
        //// Update old elements as needed.
        up.attr("class", "update");

        // ENTER
        // Create new elements as needed. Here, appending to the enter selection
        // expands the update selection to include entering elements
        en.append("text")
            .attr("class", "enter")
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
        ex.remove();
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
