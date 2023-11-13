<script lang="ts">
// https://yajanarao.medium.com/create-a-data-flow-map-using-cytoscape-and-vue-js-5be3b3ef11d2
// https://color.adobe.com/create/color-wheel#
import { ITraversalReport } from './ITraversalReport'
import port from "./port"
import testData from "./testData"
import { startCase } from "lodash"
import cydagre from "cytoscape-dagre";
import cytoscape from "cytoscape";
import GraphStyles from './GraphStyles';
import { EolStyle, Formatter, FracturedJsonOptions } from 'fracturedjsonjs'

var cy;
const store: { traversalReport: ITraversalReport; selectedNode: string | null } = { traversalReport: null/*testData*/, selectedNode: null }

const options = new FracturedJsonOptions();
options.MaxTotalLineLength = 40;
options.MaxInlineComplexity = 1;
options.JsonEolStyle = EolStyle.Crlf;

const formatter = new Formatter();

function nodesAndEdges(traversalReport: ITraversalReport) {
  var nodes = []
  var edges = []
  if (traversalReport && traversalReport.data) {
    traversalReport.data.sortedNodeNames.forEach((n) => {
      nodes.push(
        {
          data: {
            id: n,
            name: startCase(n),
            description: "",
            active: false,
            width: 200
          }
        }
      )
    })

    traversalReport.data.edges.forEach((edge) => {
      edges.push(
        {
          data: { source: edge.from, target: edge.to, label: "" }
        }
      )
    })
  }
  return { nodes, edges }
}
function drawGraph(nodesAndEdges) {
  cydagre(cytoscape);
  const cy = cytoscape({
    wheelSensitivity: .1,
    container: document.getElementById("cy"),
    boxSelectionEnabled: true,
    selectionType: "single",
    autounselectify: true,
    /* ORDER IS IMPORTANT Last style in wins */
    style: GraphStyles(cytoscape),
    elements: nodesAndEdges,
    layout: {
      name: "dagre",
      spacingFactor: .9,
      rankDir: "LR",
      fit: true,
    },
  });

  // mouseover mouseout only works when I move it above click
  cy.on('mouseover', 'node', function (evt) {
    //console.log('entered ' + this.id());
    evt.target.addClass('hovering')
    evt.target.successors()?.addClass('successor')
    evt.target.predecessors()?.addClass('predecessor')
    evt.target.incomers()?.addClass('incomer')
    evt.target.outgoers()?.addClass('outgoer')
  })
  cy.on('mouseout', 'node', function (evt) {
    evt.target.removeClass('hovering')
    evt.target.successors()?.removeClass('successor')
    evt.target.predecessors()?.removeClass('predecessor')
    evt.target.incomers()?.removeClass('incomer')
    evt.target.outgoers()?.removeClass('outgoer')
  })
  return cy
}

export default {
  data() {
    return {
      store: store
    }
  },

  created() {
    if (port) {
      port.onMessage.addListener(this.handleMessage)
    }
    window.addEventListener("message", (msg) => this.handleMessage(msg.data))
  },
  methods: {
    setMessage() {
      this.traversalReport
    },
    newMessage() {
      this.store.traversalReport = "new message"
    },
    handleMessage(msg) {
      //if (msg.source === "octopus" && /:[0-9]+$/gm.test(msg.origin)) {
      //console.log("in App.vue. message made it all the way")
      //console.log(msg)
      if (msg && msg.topic && msg.topic === "traversalReport") {
        const firstMessage = !this.store.traversalReport
        this.store.traversalReport = msg
        if (firstMessage) this.redraw()
        else {
          // clear styles from previous 
          cy.$("*").removeClass('initiator').removeClass('traversed').style({ "background-color": "" })
          // set styles      
          cy.$id(msg.data.initiator).successors()?.addClass('traversed')
          cy.$id(msg.data.initiator).addClass('initiator').style({ "background-color": "#e37332" })
            .animate({
              style: { "background-color": "white" },
              duration: 3000,
              easing: 'ease-out'
            }).delay(4000).style({ "background-color": "" })
        }
      }
    },
    serialize(stuff) { return formatter.Serialize(stuff) },
    startCase,
    redraw() {
      //console.log("redrawing")
      const me = this
      const els = nodesAndEdges(this.store.traversalReport)
      cy = drawGraph(els)
      cy.on('click', 'node', function (evt) {
        cy.elements("*").removeClass('selected')
        evt.target.addClass('selected')
        me.store.selectedNode = this.id()
      })
      cy.on('click', function (evt) {
        if (evt.target === cy) {
          me.store.selectedNode = null
          cy.elements("*").removeClass('selected')
        }
      })
    },
    openSource() {
      if (chrome.devtools) {
        chrome.devtools.inspectedWindow.getResources(
          (resources) => {
            for (const resource of resources) {
              var canonical = resource.url.replaceAll("-", "").toLowerCase()
              if (canonical.includes("/" + this.store.selectedNode.toLowerCase() + ".")) {
                chrome.devtools.panels.openResource(resource.url, 1, function () { })
              }
            }
          }
        )
      }
    }
  },
  computed:{
    standalone(){return !chrome.devtools}
  },
  mounted() {
    const me = this
    this.redraw()
  },
  // never worked, don't need ? will lose state ?
  // watch: {
  //   "this.store.traversalReport": function () {
  //     console.log("redrawing")
  //     const els = nodesAndEdges(this.store.traversalReport)
  //     drawGraph(els)
  //   }
  // },
  provide: { store: store }
}
</script>

<template>
  <div id="cy" class="cy"></div>
  <div id="details-pane" :class="{ active: store.selectedNode }">
    <div v-if="store.selectedNode" id="details-pane-inner">
      <div class="details-title">{{ startCase(store.selectedNode) }}</div>
      <pre>{{ serialize(store.traversalReport.data.state[store.selectedNode]) }}</pre>
      <div class="func" v-for="func in store.traversalReport.data.methods[store.selectedNode]"><span>ƒ</span> {{ func }}()
      </div>
      <b><a @click="openSource">Go to source</a></b><span v-if="standalone" style="font-size:smaller;"> (Not available in standalone. Install devtools as an extension.)</span>
    </div>
  </div>
  <img src="/images/octopus-photo.png" id="octo" @click="redraw()" />
</template>

<style>
body {
  font-family: Futura, Arial;
}

a {
  cursor: pointer;
}

#details-pane {
  position: absolute;
  top: 0;
  right: -35vw;
  width: 30vw;
  min-height: 200px;
  max-height: 100vh;
  overflow: auto;
  transition: right 300ms ease-in-out;
  background-color: darkcyan;
  color: white;
}

#details-pane-inner {
  padding: 20px 20px 150px 20px;
}

.details-title {
  font-size: 25px;
}

#details-pane.active {
  right: 0vw
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#octo {
  position: absolute;
  height: 100px;
  bottom: 0;
  right: 0;
}

#cy {
  height: 100vh
}

.func {
  padding: 10px 0px;
}

.func span {
  color: darkkhaki
}
</style>
