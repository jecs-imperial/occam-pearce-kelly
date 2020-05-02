"use strict";

var _index = require("../index");

var directedAcyclicGraph = _index.DirectedAcyclicGraph.fromNothing(),
    vertexName = "i",
    sourceVertexName = "j",
    targetVertexName = "k";

directedAcyclicGraph.addVertexByVertexName(vertexName);
directedAcyclicGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
var topologicallyOrderedVertexNames = directedAcyclicGraph.getTopologicallyOrderedVertexNames();
debugger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUuanMiXSwibmFtZXMiOlsiZGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJEaXJlY3RlZEFjeWNsaWNHcmFwaCIsImZyb21Ob3RoaW5nIiwidmVydGV4TmFtZSIsInNvdXJjZVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiYWRkVmVydGV4QnlWZXJ0ZXhOYW1lIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzIiwiZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBRUEsSUFBTUEsb0JBQW9CLEdBQUdDLDRCQUFxQkMsV0FBckIsRUFBN0I7QUFBQSxJQUNNQyxVQUFVLEdBQUcsR0FEbkI7QUFBQSxJQUVNQyxnQkFBZ0IsR0FBRyxHQUZ6QjtBQUFBLElBR01DLGdCQUFnQixHQUFHLEdBSHpCOztBQUtBTCxvQkFBb0IsQ0FBQ00scUJBQXJCLENBQTJDSCxVQUEzQztBQUVBSCxvQkFBb0IsQ0FBQ08sb0JBQXJCLENBQTBDSCxnQkFBMUMsRUFBNERDLGdCQUE1RDtBQUVBLElBQU1HLCtCQUErQixHQUFHUixvQkFBb0IsQ0FBQ1Msa0NBQXJCLEVBQXhDO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRGlyZWN0ZWRBY3ljbGljR3JhcGggfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBEaXJlY3RlZEFjeWNsaWNHcmFwaC5mcm9tTm90aGluZygpLFxuICAgICAgdmVydGV4TmFtZSA9IFwiaVwiLFxuICAgICAgc291cmNlVmVydGV4TmFtZSA9IFwialwiLFxuICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IFwia1wiO1xuXG5kaXJlY3RlZEFjeWNsaWNHcmFwaC5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbmRpcmVjdGVkQWN5Y2xpY0dyYXBoLmFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG5jb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzID0gZGlyZWN0ZWRBY3ljbGljR3JhcGguZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcygpO1xuXG5kZWJ1Z2dlclxuIl19