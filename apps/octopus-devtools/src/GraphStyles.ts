// https://js.cytoscape.org/
export default function (cytoscape) {
  return cytoscape
    .stylesheet()
    .selector("node")
    .css({
      shape: "roundrectangle",
      //height: 40,
      height: "auto",
      width: "data(width)",
      "background-color": (node) => (node.data("active") ? "green" : "white"),
      color: (node) => (node.data("active") ? "white" : "black"),
      "border-color": "gray",
      "border-width": 3,
      "border-radius": 4,
      content: "data(name)",
      "text-wrap": "wrap",
      "text-valign": "center",
      "text-max-width":"200",
      "compound-sizing-wrt-labels":"include", 
      padding:"10"   
    })
    .selector("edge")
    .css({
      // http://js.cytoscape.org/#style/labels
      label: "data(label)", // maps to data.label
      "text-outline-color": "white",
      "text-outline-width": 3,
      "text-valign": "center",
      "text-halign": "left",
      // https://js.cytoscape.org/demos/edge-types/
      "curve-style": "bezier",
      width: 1,
      "target-arrow-shape": "triangle",
      "line-color": "gray",
      "target-arrow-color": "gray",
    })
    .selector(".hovering")
    .css({
      height: 50,
      "border-color": "#0FBDB4",
      color: "#0FBDB4",
      "font-weight": "bold",
      "font-size": "bigger",
    })
    .selector(".predecessor")
    .css({
      color: "#BD0068",
      "border-color": "#BD0068",
      "line-color": "#BD0068",
      "target-arrow-color": "#BD0068",
    })
    .selector(".incomer")
    .css({
      color: "#702750",
      height: 50,
      "border-color": "#702750",
      "font-weight": "bold",
    })
    .selector("edge.incomer")
    .css({
      "line-color": "#702750",
      "target-arrow-color": "#702750",
      width: 2,
    })
    .selector(".successor")
    .css({
      color: "#BD9000",
      "border-color": "#BD9000",
      "line-color": "#BD9000",
      "target-arrow-color": "#BD9000",
    })
    .selector(".outgoer")
    .css({
      color: "#705F26",
      height: 50,
      "border-color": "#705F26",
      "font-weight": "bold",
    })
    .selector("edge.outgoer")
    .css({
      "line-color": "#705F26",
      "target-arrow-color": "#705F26",
      width: 2,
    })
    .selector("node.selected")
    .css({
      "background-color": "#008b8b",
      "border-color": "#008b8b",
      color: "white",
      height: 50,
      "font-weight": "bold",
      "font-size": "bigger",
    })
    .selector("node.initiator")
    .css({
      "border-color": "#e75f10",
      "transition": "background-color 5s ease-out",
    })
    .selector(".traversed")
    .css({
      "border-color": "#fa9d32",
      "line-color": "#fa9d32",
      "target-arrow-color": "#fa9d32",
    })
}
