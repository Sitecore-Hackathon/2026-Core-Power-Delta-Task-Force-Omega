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
        const height = 500;
        const margin = 1;
        const format = d3.format(",d");
        const color = d3.scaleOrdinal([
            "#6E3FFF",
            "#4408fa",
            "#674cb9",
            "#401bb0",
            "#6E3FFF",
            "#7d7d7d",
            "#cbcbcc",
            "#8200e3",
            "#893331    ",
            "#888",
            "#888",
        ]);

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
