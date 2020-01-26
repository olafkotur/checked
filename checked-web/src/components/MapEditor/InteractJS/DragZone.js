import interact from "interactjs";

const gridSnap = 25;
const minSize = 50;


interact(".zoneBlock")
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent"
      }),
      interact.modifiers.snap({
        targets: [interact.createSnapGrid({ x: gridSnap, y: gridSnap })],
        range: Infinity,
        relativePoints: [{ x: 0, y: 0 }]
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: minSize, height: minSize }
      })
    ],

    inertia: false
  })
  .draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: false
      }),
      interact.modifiers.snap({
        targets: [interact.createSnapGrid({ x: 25, y: 25 })],
        range: Infinity,
        relativePoints: [{ x: 0, y: 0 }]
      })
    ],
    // enable autoScroll
    autoScroll: false,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {

    }

  })
  .on("resizemove", function (event) {
    var target = event.target;
    var x = parseFloat(target.getAttribute("data-x")) || 0;
    var y = parseFloat(target.getAttribute("data-y")) || 0;

    // update the element's style
    target.style.width = event.rect.width + "px";
    target.style.height = event.rect.height + "px";

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px," + y + "px)";

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
    // target.textContent =
    //   Math.round(event.rect.width) + "\u00D7" + Math.round(event.rect.height);
  });

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

