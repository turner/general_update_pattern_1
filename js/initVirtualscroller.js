/**
 * Created by turner on 6/13/15.
 */

function updateVirtualScroller(virtualScroller, datasource) {

    virtualScroller.data(dataSource, function(d) {
        return d;
    });

    group.call(virtualScroller);

}

function initVirtualscroller(svgContainer, rows) {

    var virtualScroller;

    virtualScroller = d3.VirtualScroller()
        .rowHeight( 32 )
        .enter(rowEnter)
        .update(rowUpdate)
        .exit(rowExit)
        .svg(svgContainer)
        .totalRows(rows)
        .viewport(d3.select(".virtual_scroller_viewport"));

     function rowEnter(selection) {

        selection.append("rect")
            .attr("class", "virtual_scroller_row");

        selection.append("text")
            .attr("class", "virtual_scroller_row_text")
            .attr("transform", "translate(10,15)");
    }

    function rowUpdate(selection) {

        selection.select("rect")
            .attr("fill", "white");

        selection.select("text")
            .text(function (d) {
                return d.toString();
            });
    }

    function rowExit(selection) {
        // nuthin
    }

    return virtualScroller;
}
