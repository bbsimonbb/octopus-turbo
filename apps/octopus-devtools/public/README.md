# Octopus devtools

## Purpose

This extension adds a devtools tab for inspecting Octopus state graphs.

## What it does

Lets you inspect Octopus state graphs you're developing on your local machine.[^1] Open devtools and go to the Octopus tab. The next time you interact with your state graph, you should see the visualization in devtools.

Hover over a node to highlight its predecessors and antecedents.

Click on a node to open its details pane, showing the node's name (case transformed), its published value and its public methods.

Click the `open source` link to open the node source in the source tab. This works on filename. We will open all source files who's name matches the name of the node.

Subsequent traversal reports will highlight the node that initiated the traversal, and its antecedents.

At any time, you can reload the graph by clicking on the octopus. This will clear highlighting and positioning changes.

## Known issue

The tab loses its connection to the inspected page after a period of inactivity. You will need to close and re-open devtools if this happens.








[^1]: The extension presents traversal reports sent by Octopus state graph. These reports are only sent when the app you're developing is served on some high port, so this extension cannot be used to inspect a deployed application.
