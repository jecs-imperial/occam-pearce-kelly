"use strict";

import { DirectedAcyclicGraph } from "../index";

const directedAcyclicGraph = DirectedAcyclicGraph.fromNothing(),
      vertexName = "i",
      sourceVertexName = "j",
      targetVertexName = "k";

directedAcyclicGraph.addVertexByVertexName(vertexName);

directedAcyclicGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);

const topologicallyOrderedVertexNames = directedAcyclicGraph.getTopologicallyOrderedVertexNames();

debugger
