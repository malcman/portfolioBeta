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

// create a renderer
const render = Render.create({
  element: canvasContainer,
  engine,
  options: {
    width: 800,
    height: 600,
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

function toggleGravity() { // eslint-disable-line
  if (world.gravity.y !== 1) {
    world.gravity.y = 1;
  } else {
    world.gravity.y = 0;
  }
}

function getTriangle(x, y, radius, properties) {
  // x: x coordinate on canvas
  // y: y coodinate on cavas
  // properties: optional object that will be destructed and applied to
  // little triangle shapes. see below URL for more info
  // http://brm.io/matter-js/docs/classes/Body.html#properties
  const triangle = Bodies.polygon(x, y, 3, radius, properties);
  return triangle;
}

function createRotatedTrianglePyramid(xx, yy, columns, rows, columnGap, rowGap) {
  // pyramid(xx, yy, columns, rows, columnGap, rowGap, callback)
  // note: this starts from the point shape
  // and the last shape is on the right/positive side
  // rotated to be upside down
  const triangleRadius = 12;
  const fillColor = '#4F5357';

  const properties = {
    angle: Math.PI / 2,
    friction: 0,
    frictionStatic: 0,
    restitution: 1,
    render: {
      fillStyle: fillColor,
    },
  };

  // const difference = 5.19615 / 2;
  const pyra = Composites.pyramid(xx, yy, columns, rows, columnGap, rowGap, (x, y) => { // eslint-disable-line
    // eslint disabled bc apparently matter.js needs this return keyword?
    properties.render.fillStyle = Common.choose(['#C3CCD6', '#4F5357']);
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

  // const circ = Bodies.circle(500, 250, 100, { isStatic: true });
  // World.add(world, circ);
  return pyra;
}

function renderAndAddSVG(svgVertexSets, fillColor) {
  const svg = Bodies.fromVertices(700, 400, svgVertexSets, {
    isStatic: true,
    render: {
      fillStyle: fillColor,
      strokeStyle: fillColor,
      lineWidth: 1,
      friction: 0,
      frictionStatic: 0,
      isStatic: true,
    },
  }, true);

  World.add(world, svg);
}

function makeSVGXMLRequest(url, fillColor) {
  // Reads external svg file using XML request
  // upon success, renders and adds to the existing world
  const xhr = new XMLHttpRequest();

  // Define the function that will run upon receiving a response
  xhr.onload = () => {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      // Successful request
      const tags = xhr.responseXML.all;
      const paths = [];
      for (let i = 0; i < tags.length; ++i) {
        if (tags[i].tagName === 'path') {
          paths.push(tags[i]);
        }
      }
      const vertexSets = [];
      for (let j = 0; j < paths.length; ++j) {
        // NOTE FOR FUTURE USE:
        // Svg.pathToVertices requires an HTML DOM element,
        // not just a string with the appropriate points
        vertexSets.push(SVG.pathToVertices(paths[j], 30));
      }

      // const points = [];
      // for (let i = 0; i < vertexSets[0].length; ++i) {
      //   const pointArray = [];
      //   pointArray.push(vertexSets[0][i].x);
      //   pointArray.push(vertexSets[0][i].y);
      //   points.push(pointArray);
      // }
      // add these vertices to the world
      renderAndAddSVG(vertexSets, fillColor);
    } else {
      // Failed Request
      console.log('The svg request failed.'); // eslint-disable-line
    }
  };
  // Create and send a GET request
  xhr.open('GET', url);
  xhr.send();
}

function addListeners() {
  const breakButton = document.querySelector('#breakThings');
  breakButton.addEventListener('click', toggleGravity);
}

// begin main
createWalls(800, 600);
const pyra = createRotatedTrianglePyramid(450, 50, 20, 20, 0, 0);
addListeners();

// TODO clean this shit up
const svgFilenames = [
  'Curve.svg',
];

svgFilenames.forEach((filename) => {
  makeSVGXMLRequest(`./static/svg/${filename}`, '#C3CCD6');
});

// TODO put in addListeners() with access to pyra variable
Events.on(engine, 'afterUpdate', () => {
  const triangles = pyra.bodies;

  for (let i = 0; i < triangles.length; ++i) {
    const body = triangles[i];
    if (body.position.x < 0) {
      Body.setPosition(body, {
        x: 650,
        y: 50,
      });

      Body.setVelocity(body, {
        x: 0,
        y: 0,
      });
    }
  }
});

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 },
});
