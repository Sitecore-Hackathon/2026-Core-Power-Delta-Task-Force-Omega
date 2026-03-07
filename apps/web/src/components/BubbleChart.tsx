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
    product?: string; // Optional product filter
}

const getName = (d: BubbleDataPoint): string => d.name || d.id;
const getGroup = (d: BubbleDataPoint): string => d.id || d.name;
const getNames = (d: BubbleDataPoint): string[] => getName(d).split(/\s+/g);

const BubbleChart: React.FC<BubbleChartProps> = ({ onNodeClick, product }) => {
    const API_URL = `https://df-serializer-service.onrender.com/competencies${product ? `?product=${product}` : ""}`;
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [data, setData] = useState<BubbleDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState({ width: 928, height: 600 });

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
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            if (width > 0 && height > 0) {
                setDimensions({ width, height });
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;

        const { width, height } = dimensions;
        const size = Math.max(width, height) * 0.85;
        const format = d3.format(",d");
        const color = d3.scaleOrdinal([
            "#eb1f1f",
            "#d41616",
            "#c41230",
            "#a8102a",
            "#f04e4e",
            "#b91c1c",
            "#991b1b",
            "#e53935",
            "#c62828",
            "#ef5350",
            "#d32f2f",
        ]);

        const pack = d3
            .pack<{ children: BubbleDataPoint[] }>()
            .size([size, size])
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

        const offsetX = (width - size) / 2;
        const offsetY = (height - size) / 2;

        svg.attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr(
                "style",
                "max-width: 100%; height: 100%; font: 14px sans-serif; cursor: grab;",
            )
            .attr("text-anchor", "middle");

        const g = svg
            .append("g")
            .attr("transform", `translate(${offsetX},${offsetY})`);

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                g.attr("transform", event.transform.toString());
            });

        svg.call(zoom).call(
            zoom.transform,
            d3.zoomIdentity.translate(offsetX, offsetY),
        );

        const node = g
            .selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", (d) => `translate(${d.x},${d.y})`)
            .style("cursor", "pointer")
            .on("click", (_event, d) => {
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
            .attr("clip-path", (d) => `circle(${d.r})`)
            .attr("fill", "#fff")
            .attr("font-weight", 600);

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
            .attr("fill-opacity", 0.85)
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
    }, [data, onNodeClick, dimensions]);

    if (loading) return <div>Loading chart...</div>;
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <svg ref={svgRef} />
        </div>
    );
};

export default BubbleChart;
