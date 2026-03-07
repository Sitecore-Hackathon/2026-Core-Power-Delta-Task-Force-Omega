import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface BubbleDataPoint {
    id: string;
    value: number;
}

const data: BubbleDataPoint[] = [
    { id: "flare.analytics.cluster.AgglomerativeCluster", value: 3938 },
    { id: "flare.analytics.cluster.CommunityStructure", value: 3812 },
    { id: "flare.analytics.cluster.HierarchicalCluster", value: 6714 },
    { id: "flare.analytics.cluster.MergeEdge", value: 743 },
    { id: "flare.analytics.graph.BetweennessCentrality", value: 3534 },
    { id: "flare.analytics.graph.LinkDistance", value: 5731 },
    { id: "flare.analytics.graph.MaxFlowMinCut", value: 7840 },
    { id: "flare.analytics.graph.ShortestPaths", value: 5914 },
    { id: "flare.analytics.graph.SpanningTree", value: 3416 },
    { id: "flare.analytics.optimization.AspectRatioBanker", value: 7074 },
    { id: "flare.animate.Easing", value: 17010 },
    { id: "flare.animate.FunctionSequence", value: 5842 },
    { id: "flare.animate.interpolate.ArrayInterpolator", value: 1983 },
    { id: "flare.animate.interpolate.ColorInterpolator", value: 2047 },
    { id: "flare.animate.interpolate.DateInterpolator", value: 1375 },
    { id: "flare.animate.interpolate.Interpolator", value: 8746 },
    { id: "flare.animate.interpolate.MatrixInterpolator", value: 2202 },
    { id: "flare.animate.interpolate.NumberInterpolator", value: 1382 },
    { id: "flare.animate.interpolate.ObjectInterpolator", value: 1629 },
    { id: "flare.animate.interpolate.PointInterpolator", value: 1675 },
    { id: "flare.animate.interpolate.RectangleInterpolator", value: 2042 },
    { id: "flare.animate.ISchedulable", value: 1041 },
    { id: "flare.animate.Parallel", value: 5176 },
    { id: "flare.animate.Pause", value: 449 },
    { id: "flare.animate.Scheduler", value: 5593 },
    { id: "flare.animate.Sequence", value: 5534 },
    { id: "flare.animate.Transition", value: 9201 },
    { id: "flare.animate.Transitioner", value: 19975 },
    { id: "flare.animate.TransitionEvent", value: 1116 },
    { id: "flare.animate.Tween", value: 6006 },
    { id: "flare.data.converters.Converters", value: 721 },
    { id: "flare.data.converters.DelimitedTextConverter", value: 4294 },
    { id: "flare.data.converters.GraphMLConverter", value: 9800 },
    { id: "flare.data.converters.JSONConverter", value: 2220 },
    { id: "flare.data.DataField", value: 1759 },
    { id: "flare.data.DataSchema", value: 2165 },
    { id: "flare.data.DataSet", value: 586 },
    { id: "flare.data.DataSource", value: 3331 },
    { id: "flare.data.DataTable", value: 772 },
    { id: "flare.data.DataUtil", value: 3322 },
    { id: "flare.display.DirtySprite", value: 8833 },
    { id: "flare.display.LineSprite", value: 1732 },
    { id: "flare.display.RectSprite", value: 3623 },
    { id: "flare.display.TextSprite", value: 10066 },
    { id: "flare.flex.FlareVis", value: 4116 },
    { id: "flare.physics.DragForce", value: 1082 },
    { id: "flare.physics.GravityForce", value: 1336 },
    { id: "flare.physics.IForce", value: 319 },
    { id: "flare.physics.NBodyForce", value: 10498 },
    { id: "flare.physics.Particle", value: 2822 },
    { id: "flare.physics.Simulation", value: 9983 },
    { id: "flare.physics.Spring", value: 2213 },
    { id: "flare.physics.SpringForce", value: 1681 },
    { id: "flare.util.Arrays", value: 8258 },
    { id: "flare.util.Colors", value: 10001 },
    { id: "flare.util.Dates", value: 8217 },
    { id: "flare.util.Displays", value: 12555 },
    { id: "flare.util.Filter", value: 2324 },
    { id: "flare.util.Geometry", value: 10993 },
    { id: "flare.util.Strings", value: 22026 },
    { id: "flare.vis.axis.Axes", value: 1302 },
    { id: "flare.vis.axis.Axis", value: 24593 },
    { id: "flare.vis.axis.AxisGridLine", value: 652 },
    { id: "flare.vis.axis.AxisLabel", value: 636 },
    { id: "flare.vis.axis.CartesianAxes", value: 6703 },
    { id: "flare.vis.controls.AnchorControl", value: 2138 },
    { id: "flare.vis.controls.ClickControl", value: 3824 },
    { id: "flare.vis.controls.Control", value: 1353 },
    { id: "flare.vis.controls.ControlList", value: 4665 },
    { id: "flare.vis.controls.DragControl", value: 2649 },
    { id: "flare.vis.controls.ExpandControl", value: 2832 },
    { id: "flare.vis.controls.HoverControl", value: 4896 },
    { id: "flare.vis.controls.IControl", value: 763 },
    { id: "flare.vis.controls.PanZoomControl", value: 5222 },
    { id: "flare.vis.controls.SelectionControl", value: 7862 },
    { id: "flare.vis.controls.TooltipControl", value: 8435 },
    { id: "flare.vis.data.Data", value: 20544 },
    { id: "flare.vis.data.DataList", value: 19788 },
    { id: "flare.vis.data.DataSprite", value: 10349 },
    { id: "flare.vis.data.EdgeSprite", value: 3301 },
    { id: "flare.vis.data.NodeSprite", value: 19382 },
    { id: "flare.vis.data.ScaleBinding", value: 11275 },
    { id: "flare.vis.data.Tree", value: 7147 },
    { id: "flare.vis.data.TreeBuilder", value: 9930 },
    { id: "flare.vis.events.DataEvent", value: 2313 },
    { id: "flare.vis.events.SelectionEvent", value: 1880 },
    { id: "flare.vis.events.TooltipEvent", value: 1701 },
    { id: "flare.vis.events.VisualizationEvent", value: 1117 },
    { id: "flare.vis.legend.Legend", value: 20859 },
    { id: "flare.vis.legend.LegendItem", value: 4614 },
    { id: "flare.vis.legend.LegendRange", value: 10530 },
    { id: "flare.vis.operator.encoder.ColorEncoder", value: 3179 },
    { id: "flare.vis.operator.encoder.Encoder", value: 4060 },
    { id: "flare.vis.operator.encoder.PropertyEncoder", value: 4138 },
    { id: "flare.vis.operator.encoder.ShapeEncoder", value: 1690 },
    { id: "flare.vis.operator.encoder.SizeEncoder", value: 1830 },
    { id: "flare.vis.operator.filter.FisheyeTreeFilter", value: 3444 },
    { id: "flare.vis.operator.filter.GraphDistanceFilter", value: 3416 },
    { id: "flare.vis.operator.filter.VisibilityFilter", value: 3509 },
    { id: "flare.vis.operator.IOperator", value: 1286 },
    { id: "flare.vis.operator.layout.AxisLayout", value: 6725 },
    { id: "flare.vis.operator.layout.BundledEdgeRouter", value: 3727 },
    { id: "flare.vis.operator.layout.CircleLayout", value: 9317 },
    { id: "flare.vis.operator.layout.CirclePackingLayout", value: 12003 },
    { id: "flare.vis.operator.layout.DendrogramLayout", value: 4853 },
    { id: "flare.vis.operator.layout.ForceDirectedLayout", value: 8411 },
    { id: "flare.vis.operator.layout.IcicleTreeLayout", value: 4864 },
    { id: "flare.vis.operator.layout.IndentedTreeLayout", value: 3174 },
    { id: "flare.vis.operator.layout.Layout", value: 7881 },
    { id: "flare.vis.operator.layout.NodeLinkTreeLayout", value: 12870 },
    { id: "flare.vis.operator.layout.PieLayout", value: 2728 },
    { id: "flare.vis.operator.layout.RadialTreeLayout", value: 12348 },
    { id: "flare.vis.operator.layout.RandomLayout", value: 870 },
    { id: "flare.vis.operator.layout.StackedAreaLayout", value: 9121 },
    { id: "flare.vis.operator.layout.TreeMapLayout", value: 9191 },
    { id: "flare.vis.operator.Operator", value: 2490 },
    { id: "flare.vis.operator.SortOperator", value: 2023 },
    { id: "flare.vis.Visualization", value: 16540 },
];

const getName = (d: BubbleDataPoint): string => d.id.split(".").pop() ?? "";

const getGroup = (d: BubbleDataPoint): string => d.id.split(".")[1] ?? "";

const getNames = (d: BubbleDataPoint): string[] =>
    getName(d).split(/(?=[A-Z][a-z])|\s+/g);

const BubbleChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 928;
        const height = width;
        const margin = 1;
        const format = d3.format(",d");
        const color = d3.scaleOrdinal(d3.schemeTableau10);

        const pack = d3
            .pack<{ children: BubbleDataPoint[] }>()
            .size([width - margin * 2, height - margin * 2])
            .padding(3);

        const root = pack(
            d3
                .hierarchy({ children: data } as {
                    children: BubbleDataPoint[];
                })
                .sum((d) =>
                    "value" in d ? (d as unknown as BubbleDataPoint).value : 0,
                ),
        );

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg.attr("width", width)
            .attr("height", height)
            .attr("viewBox", `${-margin} ${-margin} ${width} ${height}`)
            .attr(
                "style",
                "max-width: 100%; height: auto; font: 10px sans-serif;",
            )
            .attr("text-anchor", "middle");

        const node = svg
            .append("g")
            .selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);

        node.append("title").text(
            (d) =>
                `${(d.data as unknown as BubbleDataPoint).id}\n${format(d.value ?? 0)}`,
        );

        node.append("circle")
            .attr("fill-opacity", 0.7)
            .attr("fill", (d) =>
                color(getGroup(d.data as unknown as BubbleDataPoint)),
            )
            .attr("r", (d) => d.r);

        const text = node
            .append("text")
            .attr("clip-path", (d) => `circle(${d.r})`);

        text.selectAll("tspan")
            .data((d) => getNames(d.data as unknown as BubbleDataPoint))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (_d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
            .text((d) => d);

        text.append("tspan")
            .attr("x", 0)
            .attr(
                "y",
                (d) =>
                    `${getNames((d as unknown as { data: BubbleDataPoint }).data).length / 2 + 0.35}em`,
            )
            .attr("fill-opacity", 0.7)
            .text((d) =>
                format((d as unknown as { value: number }).value ?? 0),
            );
    }, []);

    return <svg ref={svgRef} />;
};

export default BubbleChart;
