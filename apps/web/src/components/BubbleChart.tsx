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
    product?: string;
    selectedNodeId?: string | null;
}

function isBubbleDataPoint(obj: unknown): obj is BubbleDataPoint {
    return (
        !!obj &&
        typeof obj === "object" &&
        "id" in obj &&
        "name" in obj &&
        "value" in obj
    );
}

const getName = (d: BubbleDataPoint): string => d.name || d.id;
const getGroup = (d: BubbleDataPoint): string => d.id || d.name;
const getNames = (d: BubbleDataPoint): string[] => getName(d).split(/\s+/g);

const BubbleChart: React.FC<BubbleChartProps> = ({ onNodeClick, product, selectedNodeId }) => {
    const selectedNodeIdRef = useRef(selectedNodeId);
    selectedNodeIdRef.current = selectedNodeId;
    const API_URL = `https://df-serializer-service.onrender.com/competencies${product ? `?product=${product}` : ""}`;

    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [data, setData] = useState<BubbleDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState({ width: 928, height: 600 });

    useEffect(() => {
        let isMounted = true;
        queueMicrotask(() => setLoading(true));
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((json) => {
                if (!isMounted) return;
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
                            weight_components: c.weight_components as Record<string, unknown>,
                        })),
                    );
                    setError(null);
                } else {
                    setError("Invalid data format");
                }
                setLoading(false);
            })
            .catch((e) => {
                if (!isMounted) return;
                setError(e.message);
                setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, [API_URL, product]);

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

        const colorPalettes: Record<string, string[]> = {
            sitecoreai: [
                "#eb1f1f", "#d41616", "#c41230", "#a8102a", "#f04e4e",
                "#b91c1c", "#991b1b", "#e53935", "#c62828", "#ef5350", "#d32f2f",
            ],
            contenthub: [
                "#1f77eb", "#166ad4", "#125cc4", "#104aa8", "#4e8ff0",
                "#1c5cb9", "#1b4999", "#397be5", "#286ac6", "#5093ef", "#2f6fd3",
            ],
        };
        const palette =
            product && colorPalettes[product]
                ? colorPalettes[product]
                : colorPalettes.sitecoreai;
        const color = d3.scaleOrdinal(palette);

        const pack = d3
            .pack<{ children: BubbleDataPoint[] }>()
            .size([size, size])
            .padding(4);

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

        // Defs for filters and gradients
        const defs = svg.append("defs");

        // Drop shadow filter
        const filter = defs.append("filter")
            .attr("id", "bubble-shadow")
            .attr("x", "-20%").attr("y", "-20%")
            .attr("width", "140%").attr("height", "140%");
        filter.append("feDropShadow")
            .attr("dx", 0).attr("dy", 2)
            .attr("stdDeviation", 4)
            .attr("flood-color", "rgba(0,0,0,0.15)");

        // Hover shadow (stronger)
        const hoverFilter = defs.append("filter")
            .attr("id", "bubble-shadow-hover")
            .attr("x", "-25%").attr("y", "-25%")
            .attr("width", "150%").attr("height", "150%");
        hoverFilter.append("feDropShadow")
            .attr("dx", 0).attr("dy", 4)
            .attr("stdDeviation", 8)
            .attr("flood-color", "rgba(0,0,0,0.2)");

        svg.attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("style", "max-width: 100%; height: 100%; font: 13px 'Inter', system-ui, sans-serif; cursor: grab;")
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

        // Create node groups - start at center for entrance animation
        const centerX = size / 2;
        const centerY = size / 2;

        const node = g
            .selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", () => `translate(${centerX},${centerY}) scale(0)`)
            .style("cursor", "pointer");

        // Animate nodes to final positions with staggered timing
        node.transition()
            .duration(700)
            .delay((_d, i) => i * 40)
            .ease(d3.easeBackOut.overshoot(0.8))
            .attr("transform", (d) => `translate(${d.x},${d.y}) scale(1)`);

        node.append("title").text((d) =>
            isBubbleDataPoint(d.data)
                ? `${d.data.name}\n${format(d.value ?? 0)}`
                : "",
        );

        // Circles with gradient fills and shadows (initial state: no selection)
        node.append("circle")
            .attr("class", "bubble-circle")
            .attr("fill", (d) =>
                isBubbleDataPoint(d.data) ? color(getGroup(d.data)) : "#ccc",
            )
            .attr("fill-opacity", 0.88)
            .attr("r", (d) => d.r)
            .attr("filter", "url(#bubble-shadow)")
            .attr("stroke", "rgba(255,255,255,0.15)")
            .attr("stroke-width", 1);

        // Hover interactions - read selectedNodeId from ref to avoid re-binds
        node.on("mouseenter", function (_event, d) {
            const circle = d3.select(this).select("circle");
            circle
                .attr("filter", "url(#bubble-shadow-hover)")
                .attr("fill-opacity", 1)
                .attr("stroke", "rgba(255,255,255,0.5)")
                .attr("stroke-width", 2);
            d3.select(this)
                .raise()
                .transition()
                .duration(200)
                .ease(d3.easeQuadOut)
                .attr("transform", `translate(${d.x},${d.y}) scale(1.08)`);
        })
        .on("mouseleave", function (_event, d) {
            const selId = selectedNodeIdRef.current;
            const isSelected = isBubbleDataPoint(d.data) && d.data.id === selId;
            const circle = d3.select(this).select("circle");
            circle
                .attr("filter", isSelected ? "url(#bubble-shadow-hover)" : "url(#bubble-shadow)")
                .attr("fill-opacity", isSelected ? 1 : (selId ? 0.4 : 0.88))
                .attr("stroke", isSelected ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)")
                .attr("stroke-width", isSelected ? 2.5 : 1);
            d3.select(this)
                .transition()
                .duration(200)
                .ease(d3.easeQuadOut)
                .attr("transform", `translate(${d.x},${d.y}) scale(1)`);
        })
        .on("click", (_event, d) => {
            if (onNodeClick && isBubbleDataPoint(d.data)) {
                onNodeClick(d.data);
            }
        });

        // Text labels - appear after bubbles land
        const text = node
            .append("text")
            .attr("clip-path", (d) => `circle(${d.r})`)
            .attr("fill", "#fff")
            .attr("font-weight", 600)
            .style("pointer-events", "none")
            .style("text-shadow", "0 1px 3px rgba(0,0,0,0.35)")
            .attr("opacity", 0);

        // Fade in text after entrance animation
        text.transition()
            .delay((_d, i) => i * 40 + 500)
            .duration(300)
            .attr("opacity", 1);

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
            .attr("fill-opacity", 0.85);

    }, [data, onNodeClick, dimensions, product]);

    // Separate effect: update bubble styles when selection changes (no rebuild/animation)
    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll<SVGGElement, d3.HierarchyCircularNode<BubbleDataPoint>>("g")
            .each(function (_d) {
                const nodeData = _d?.data;
                if (!isBubbleDataPoint(nodeData)) return;
                const isSelected = nodeData.id === selectedNodeId;
                const circle = d3.select(this).select("circle");
                circle.transition().duration(250)
                    .attr("fill-opacity", isSelected ? 1 : (selectedNodeId ? 0.4 : 0.88))
                    .attr("filter", isSelected ? "url(#bubble-shadow-hover)" : "url(#bubble-shadow)")
                    .attr("stroke", isSelected ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)")
                    .attr("stroke-width", isSelected ? 2.5 : 1);
            });
    }, [selectedNodeId, data]);

    if (loading)
        return (
            <div className="loading-container">
                <div className="loading-spinner" />
                <span style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 500 }}>
                    Loading competencies...
                </span>
            </div>
        );
    if (error)
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "#dc2626",
                fontSize: 14,
            }}>
                Error: {error}
            </div>
        );
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
