import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

export interface BubbleDataPoint {
    id: string;
    name: string;
    value: number;
    description?: string;
    urls?: {
        official_docs: string[];
        community_resources: string[];
    };
    weight_components?: Record<string, unknown>;
}

interface BubbleChartProps {
    onNodeClick?: (node: BubbleDataPoint) => void;
}

const API_URL = "https://df-serializer-service.onrender.com/competencies";

const getName = (d: BubbleDataPoint): string => d.name || d.id;
const getGroup = (d: BubbleDataPoint): string => d.id || d.name;
const getNames = (d: BubbleDataPoint): string[] => getName(d).split(/\s+/g);

const BubbleChart: React.FC<BubbleChartProps> = ({ onNodeClick }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [data, setData] = useState<BubbleDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((json) => {
                if (json && Array.isArray(json.competencies)) {
                    setData(
                        json.competencies.map((c: Record<string, unknown>) => ({
                            id: c.id as string,
                            name: c.name as string,
                            value: c.weight_pct as number,
                            description: c.description as string,
                            urls: c.urls as {
                                official_docs: string[];
                                community_resources: string[];
                            },
                            weight_components: c.weight_components as Record<
                                string,
                                unknown
                            >,
                        })),
                    );
                    setError(null);
                } else {
                    setError("Invalid data format");
                }
                setLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;

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
            d3.hierarchy({ children: data }).sum((d) => {
                if (
                    d &&
                    typeof d === "object" &&
                    "value" in d &&
                    typeof (d as { value: unknown }).value === "number"
                ) {
                    return (d as { value: number }).value;
                }
                return 0;
            }),
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
            .attr("transform", (d) => `translate(${d.x},${d.y})`)
            .style("cursor", "pointer")
            .on("click", (event, d) => {
                if (onNodeClick && isBubbleDataPoint(d.data)) {
                    onNodeClick(d.data);
                }
            });

        node.append("title").text((d) =>
            isBubbleDataPoint(d.data)
                ? `${d.data.name}\n${format(d.value ?? 0)}`
                : "",
        );

        node.append("circle")
            .attr("fill-opacity", 0.7)
            .attr("fill", (d) =>
                isBubbleDataPoint(d.data) ? color(getGroup(d.data)) : "#ccc",
            )
            .attr("r", (d) => d.r);

        const text = node
            .append("text")
            .attr("clip-path", (d) => `circle(${d.r})`);

        text.selectAll("tspan")
            .data((d) => (isBubbleDataPoint(d.data) ? getNames(d.data) : []))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (_d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
            .text((d) => d);

        text.append("tspan")
            .attr("x", 0)
            .attr("y", (d) =>
                isBubbleDataPoint(d.data)
                    ? `${getNames(d.data).length / 2 + 0.35}em`
                    : "0em",
            )
            .attr("fill-opacity", 0.7)
            .text((d) =>
                isBubbleDataPoint(d.data) ? format(d.data.value ?? 0) : "",
            );

        // Type guard for BubbleDataPoint
        function isBubbleDataPoint(obj: unknown): obj is BubbleDataPoint {
            return (
                !!obj &&
                typeof obj === "object" &&
                "id" in obj &&
                "name" in obj &&
                "value" in obj
            );
        }
    }, [data, onNodeClick]);

    if (loading) return <div>Loading chart...</div>;
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
    return <svg ref={svgRef} />;
};

export default BubbleChart;
