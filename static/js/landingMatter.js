// module aliases
/* eslint no-undef: 0 */
const Engine = Matter.Engine;
const Events = Matter.Events;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Common = Matter.Common;
const MouseConstraint = Matter.MouseConstraint;
const SVG = Matter.Svg;

// create an engine
const engine = Engine.create();

// get parent element to place canvas in
const canvasContainer = document.querySelector('#canvasContainer');

const canvasSize = {
  width: 800,
  height: 600,
};

// create a renderer
const render = Render.create({
  element: canvasContainer,
  engine,
  options: {
    width: canvasSize.width,
    height: canvasSize.height,
    wireframes: false,
    hasBounds: true,
    background: '#FFF',
    pixelRatio: 'auto',
  },
});

const world = engine.world;
world.gravity.y = 0;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

function createWalls(canvasWidth, canvasHeight) {
  const wallWidth = 100;
  const widthOffset = wallWidth / 2;

  // x, y, width, height, options
  // x, y is center of body
  const leftWall = Bodies.rectangle(
    -widthOffset,
    canvasHeight / 2,
    wallWidth,
    canvasHeight,
    { isStatic: true },
  );

  const rightWall = Bodies.rectangle(
    canvasWidth + widthOffset,
    canvasHeight / 2,
    wallWidth,
    canvasHeight,
    { isStatic: true },
  );

  const ground = Bodies.rectangle(
    canvasWidth / 2,
    canvasHeight + widthOffset,
    canvasWidth,
    wallWidth,
    { isStatic: true },
  );

  const ceiling = Bodies.rectangle(
    canvasWidth / 2,
    -widthOffset,
    canvasWidth,
    wallWidth,
    { isStatic: true },
  );

  // World.add(world, [leftWall, rightWall, ground, ceiling]);
  World.add(world, [rightWall, ceiling, ground]);
}

function toggleGravity(e, minGravity = 0, maxGravity = 1) {
  if (world.gravity.y !== maxGravity) {
    world.gravity.y = maxGravity;
  } else {
    world.gravity.y = minGravity;
  }
}

function getTriangle(x, y, radius, properties) {
  // x: x coordinate on canvas
  // y: y coodinate on cavas
  // properties: optional object that will be destructed and applied to
  // little triangle shapes. see below URL for more info
  // http://brm.io/matter-js/docs/classes/Body.html#properties
  const numSides = 3;
  const triangle = Bodies.polygon(x, y, numSides, radius, properties);
  return triangle;
}

function createRotatedTrianglePyramid(xx, yy, columns, rows, columnGap, rowGap) {
  // pyramid(xx, yy, columns, rows, columnGap, rowGap, callback)
  // note: this starts from the point shape
  // and the last shape is on the right/positive side
  // rotated to be upside down
  const triangleRadius = 12;
  const fillColors = ['#C3CCD6', '#4F5357', '#182E45'];

  const properties = {
    angle: Math.PI / 2,
    friction: 0,
    frictionStatic: 0,
    restitution: 1,
    render: {
      fillStyle: null,
    },
  };

  const pyra = Composites.pyramid(xx, yy, columns, rows, columnGap, rowGap, (x, y) => { // eslint-disable-line
    // eslint disabled bc apparently matter.js needs this return keyword?
    properties.render.fillStyle = Common.choose(fillColors);
    return getTriangle(x, y, triangleRadius, properties);
  });

  const pyraBounds = Composite.bounds(pyra);
  const midY = (pyraBounds.min.y + pyraBounds.max.y) / 2;
  const midX = (pyraBounds.min.x + pyraBounds.max.x) / 2;

  // find the center of the pyramid
  const centerPos = {
    x: midX,
    y: midY,
  };

  // and rotate it around that
  Composite.rotate(pyra, Math.PI, centerPos);
  World.add(world, [pyra]);

  return pyra;
}

function renderAndAddSVG(svgVertexSets, x, y, fillColor) {
  const svg = Bodies.fromVertices(x, y, svgVertexSets, {
    isStatic: true,
    render: {
      fillStyle: fillColor,
      strokeStyle: fillColor,
      lineWidth: 1,
    },
  });

  World.add(world, svg);
}

function makeSVGXMLRequest(url, x, y, fillColor) {
  // Reads external svg file using XML request
  // upon success, renders and adds to the existing world
  // x: x canvas coordinate
  // y: y canvas coordinate
  // fillColor: fill and stroke color applied to SVG shape
  const xhr = new XMLHttpRequest();

  // Define the function that will run upon receiving a response
  xhr.onload = () => {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      // Successful request
      const tags = xhr.responseXML.all;
      const paths = [];

      // get all <path> tags in the svg markup
      for (let i = 0; i < tags.length; ++i) {
        if (tags[i].tagName === 'path') {
          paths.push(tags[i]);
        }
      }

      // convert each path to a set of vertices
      const vertexSets = [];
      for (let j = 0; j < paths.length; ++j) {
        // NOTE FOR FUTURE USE:
        // Svg.pathToVertices requires an HTML DOM element,
        // not just a string with the appropriate points
        vertexSets.push(SVG.pathToVertices(paths[j], 30));
      }

      // add these vertices to the world
      renderAndAddSVG(vertexSets, x, y, fillColor);
    } else {
      // Failed Request
      console.log('The svg request failed.'); // eslint-disable-line
    }
  };
  // Create and send a GET request
  xhr.open('GET', url);
  xhr.send();
}

function addAllSVGsToCanvas() {
  // modify the following object to edit specific SVG data
  const svgs = [
    {
      filename: 'Curve.svg',
      x: 700,
      y: 400,
      fillColor: '#B3BBC5',
    },
  ];

  // make file requests via XML and add using default renderer
  svgs.forEach((svg) => {
    const fullFilePath = `./static/svg/${svg.filename}`;
    makeSVGXMLRequest(fullFilePath, svg.x, svg.y, svg.fillColor);
  });
}

function teleportBodies(composite, startPoint, axis) {
  // this function should be put in an Engine event listener to work properly
  // watches bodies from composite variable
  // if they pass the bounds of the indicated axis,
  // teleports those bodies to startPoint
  // startPoint should be of the following form:
  // { x: xCoord, y: yCoord }

  // error checking
  if (!startPoint.x || !startPoint.y) console.log('Warning, no startPoint defined in teleportBodies()'); // eslint-disable-line

  for (let i = 0; i < composite.bodies.length; ++i) {
    const body = composite.bodies[i];

    // if the body goes beyond the axis' bounds
    if (body.position[axis] < render.bounds.min[axis]
      || body.position[axis] > render.bounds.max[axis]) {
      // "teleport" this body to startPoint
      Body.setPosition(body, {
        x: startPoint.x,
        y: startPoint.y,
      });

      // ensure previous velocity does not carry over
      Body.setVelocity(body, {
        x: 0,
        y: 0,
      });
    }
  }
}

function addListeners(pyraComposite) {
  const breakButton = document.querySelector('#breakThings');
  breakButton.addEventListener('click', toggleGravity);

  Events.on(engine, 'afterUpdate', () => {
    const pyraBodiesStartPoint = { x: 650, y: 50 };
    teleportBodies(pyraComposite, pyraBodiesStartPoint, 'x');
  });
}

// begin main
createWalls(canvasSize.width, canvasSize.height);
addAllSVGsToCanvas();
const pyra = createRotatedTrianglePyramid(450, 50, 20, 20, 0, 0);
addListeners(pyra);

// add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.5,
    render: {
      visible: false,
    },
  },
});

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: canvasSize.width, y: canvasSize.height },
});
