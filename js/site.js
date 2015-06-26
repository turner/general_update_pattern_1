/**
 * Created by turner on 6/26/15.
 */
var scarpa = (function (scarpa) {

    scarpa.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    scarpa.digits = _.range(10000);

    scarpa.datasource = function (doShuffle) {

        if (!doShuffle) {
            //return scarpa.alphabet;
            return scarpa.digits;
        } else {
           return d3.shuffle(scarpa.digits);
        }
    };

    return scarpa;
})(scarpa || {});

function letsGo() {

    var svgPackage,
        virtualScroller;

    svgPackage = doSVG();
    virtualScroller = initVirtualscroller(svgPackage.svgContainer, scarpa.digits.length);

    update(scarpa.datasource(false));

    setInterval(function() {
        console.log("lets go");
        update(scarpa.datasource(true));
    }, 2000);

    function update(datasource) {

        virtualScroller.data(datasource, function(d) {
            return d;
        });

        svgPackage.group.call(virtualScroller);
    }

    function doSVG () {

        var group,
            svg;

        svg = d3.select(".virtual_scroller_viewport").append("svg");
        svg.insert("defs", ":first-child");

        group = svg.append("g");
        group.append("rect");

        return { svgContainer: svg, group: group };
    }

}
