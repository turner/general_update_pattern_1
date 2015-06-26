/**
 * Created by turner on 6/13/15.
 */

function initVirtualscroller(rows) {

    var rowHeight,
        dataSource,
        svg,
        defs,
        group,
        rowEnter,
        rowUpdate,
        rowExit,
        virtualScroller;

    rowHeight = 32;
    dataSource = { name: "my digits", digits: [] };

    count(rows).forEach(function(digit, index){
        dataSource.digits.push({ id: ("number_" + digit), digit: digit });
    });

    svg = d3.select(".virtual_scroller_viewport").append("svg");
    svg.insert("defs", ":first-child");

    group = svg.append("g");

    group.append("rect");

    rowEnter = function(selection) {

        selection.append("rect")
            .attr("class", "virtual_scroller_row");

        selection.append("text")
            .attr("class", "virtual_scroller_row_text")
            .attr("transform", "translate(10,15)");
    };

    rowUpdate = function(selection) {

        selection.select("rect")
            .attr("fill", function(d) { return scarpa.grey_SVG(255); });

        selection.select("text")
            .text(function (d) {
                return d.id;
            });
    };

    rowExit = function(rowSelection) {
    };

    virtualScroller = d3.VirtualScroller()
        .rowHeight( rowHeight )
        .enter(rowEnter)
        .update(rowUpdate)
        .exit(rowExit)
        .svg(svg)
        .totalRows(rows)
        .viewport(d3.select(".virtual_scroller_viewport"));

    //virtualScroller.data([]);

    virtualScroller.data(dataSource.digits, function(d) {
        return d.id;
    });

    group.call(virtualScroller);

    function count(c) {

        var digits = [];
        for (var i=0; i < c; i++) {
            digits.push(i);
        }
        return digits;
    }


    return virtualScroller;
}
