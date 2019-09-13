// module aliases
/* eslint no-undef: 0 */
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Common = Matter.Common;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const Engine = Matter.Engine;
const Events = Matter.Events;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Render = Matter.Render;
const SVG = Matter.Svg;
const World = Matter.World;


const allPanelData = {
  landing: {
    engine: Engine.create(),
    // To be reset in following loop...
    render: null,
    world: null,
  },
  design: {
    engine: Engine.create(),
    render: null,
    world: null,
  },
};

// create an engine
// const engine = Engine.create();

// get parent element to place canvas in
// const canvasContainer = document.querySelector('#canvasContainer');
const canvasSize = {
  width: 800,
  height: 600,
};
const DARK_BLUE = '#354557';
const particleCategory = Body.nextCategory();

const renderProps = {
  // To be reset in following loop...
  element: null,
  engine: null,
  options: {
    width: canvasSize.width,
    height: canvasSize.height,
    wireframes: false,
    // showAxes: true,
    hasBounds: true,
    background: '#dedede',
    // pixelRatio: 'auto',
  },
};

function populatePanelData(panelData) {
  // properly sets world, engine, and element in panelData object
  // this allows for multiple canvases to exist on the same page
  const allCanvases = panelData;
  Object.keys(allCanvases).forEach((key) => {
    // add this engine and contianer for this renderer
    allCanvases[key].world = allCanvases[key].engine.world;
    renderProps.engine = allCanvases[key].engine;
    renderProps.element = document.querySelector(`#${key}CanvasContainer`);

    const newRender = Render.create(renderProps);
    allCanvases[key].render = newRender;

    // TODO: remove and add to listener; only run engine while in view
    Engine.run(allCanvases[key].engine);
    Render.run(allCanvases[key].render);
  });
  return allCanvases;
}

const allCanvases = populatePanelData(allPanelData);

// create a renderer
// const render = Render.create({
//   element: canvasContainer,
//   engine,
//   options: {
//     width: canvasSize.width,
//     height: canvasSize.height,
//     wireframes: false,
//     // showAxes: true,
//     hasBounds: true,
//     background: '#dedede',
//     // pixelRatio: 'auto',
//   },
// });

// const world = engine.world;
// // world.gravity.y = 0;

// // run the engine
// Engine.run(engine);

// // run the renderer
// Render.run(render);

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

function degreesToRadians(deg) {
  return deg * (Math.PI / 180);
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

function renderAndAddSVG(panel, svgVertexSets, x, y, properties, spin) {
  const svg = Bodies.fromVertices(x, y, svgVertexSets, properties);

  World.add(panel.world, svg);
  if (spin) {
    Events.on(panel.engine, 'afterUpdate', () => {
      Body.rotate(svg, spin);
    });
  }
  return svg;
}

function makeSVGXMLRequest(panel, url, x, y, properties, spin) {
  // Reads external svg file using XML request
  // upon success, renders and adds to the existing world
  // x: x canvas coordinate
  // y: y canvas coordinate
  // properties: options for SVG body
  const xhr = new XMLHttpRequest();

  // Define the function that will run upon receiving a response
  xhr.onload = () => {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      // Successful request
      const paths = xhr.responseXML.getElementsByTagName('path');

      // convert each path to a set of vertices
      const vertexSets = [];
      for (let j = 0; j < paths.length; ++j) {
        // NOTE FOR FUTURE USE:
        // Svg.pathToVertices requires an HTML DOM element,
        // not just a string with the appropriate points
        vertexSets.push(SVG.pathToVertices(paths[j], 30));
      }

      // add these vertices to the world
      const addedSVG = renderAndAddSVG(panel, vertexSets, x, y, properties, spin);
      if (url === './static/svg/windmillSingle.svg') {
        const windmillConstraint = Constraint.create({
          pointA: { x, y },
          bodyB: addedSVG,
        });
        World.add(panel.world, windmillConstraint);
      }
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
    // {
    //   filename: 'Curve.svg',
    //   x: 700,
    //   y: 400,
    //   fillColor: '#B3BBC5',
    // },
    {
      filename: 'windmillSingle.svg',
      x: 400,
      y: 300,
      panelName: 'landing',
      spin: degreesToRadians(-1),
      properties: {
        render: {
          fillStyle: DARK_BLUE,
          strokeStyle: DARK_BLUE,
          lineWidth: 1,
        },
        collisionFilter: {
          mask: particleCategory,
        },
      },
    },

    {
      filename: 'windmillSingle.svg',
      x: 400,
      y: 300,
      panelName: 'design',
      spin: degreesToRadians(1),
      properties: {
        render: {
          fillStyle: '#000',
          strokeStyle: '#000',
          lineWidth: 1,
        },
        collisionFilter: {
          mask: particleCategory,
        },
      },
    },

  ];

  // make file requests via XML and add using default renderer
  svgs.forEach((svg) => {
    const fullFilePath = `./static/svg/${svg.filename}`;
    const panel = allCanvases[svg.panelName];
    makeSVGXMLRequest(panel, fullFilePath, svg.x, svg.y, svg.properties, svg.spin);
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

// function spinSpinners(spinner) {
//   // for (let i = 0; i < spinner.bodies.length; ++i) {
//   // Body.rotate(spinner.bodies[i], 0.12);
//   // }
//   // Composite.rotate(spinner, 0.12, { x: 400, y: 300 });
//   Body.rotate(spinner, 0.12);
// }

function getIsoscelesTriangle(x, y, base, height, properties, fromBase = true) {
  // create an upright isosceles triangle
  vertices = [
    // left point
    { x: x - (base / 2), y },
    // right point
    { x: x + (base / 2), y },
    // top point
    { x, y: y - height },
  ];
  const yCenter = (fromBase) ? y - ((1 / 3) * height) : y;
  const tri = Bodies.fromVertices(x, yCenter, vertices, properties);
  return tri;
}

function createWindmill(x, y, innerRadius, outerRadius, spokeBase, fillColor, numSpokes = 3) {
  const windmill = Composite.create();
  const triangleCategory = 0x0016;
  const centerRadius = 25;
  // get center of windmill to attach spokes to
  const centerProperties = {
    collisionFilter: {
      mask: triangleCategory //eslint-disable-line
    },
    // isStatic: true,
    render: {
      fillStyle: 'red',
    },
  };
  const circleCenter = Bodies.circle(x, y, centerRadius, centerProperties);

  const centerConstraint = Constraint.create({
    bodyA: circleCenter,
    pointB: { x, y },
  });

  World.add(world, [circleCenter, centerConstraint]);
  Composite.add(windmill, circleCenter);

  // add spokes
  let angleDegrees = 0;
  const angleAddition = 360 / numSpokes;
  // properties for each spoke
  const properties = {
    angle: 0,
    render: {
      fillStyle: fillColor,
    },
    collisionFilter: {
      mask: triangleCategory,
    },
  };

  for (let i = 0; i < 1; ++i) {
    // properties.angle = degreesToRadians(angleDegrees);
    const newSpoke = getIsoscelesTriangle(x, y, spokeBase, outerRadius, properties);
    const yRelativeToCircleOrigin = innerRadius * Math.sin(degreesToRadians(angleDegrees));
    const xRelativeToCircleOrigin = innerRadius * Math.cos(degreesToRadians(angleDegrees));

    const centerToBase = (1 / 3) * outerRadius;
    const halfBase = spokeBase / 2;
    const centerMiddleConstraint = Constraint.create({
      bodyA: circleCenter,
      bodyB: newSpoke,
      pointB: { x: 0, y: centerToBase - 5 },
      stiffness: 1,
      length: 0,
    });

    const centerLeftConstraint = Constraint.create({
      bodyA: circleCenter,
      pointA: { x: -xRelativeToCircleOrigin, y: yRelativeToCircleOrigin },
      bodyB: newSpoke,
      pointB: { x: -halfBase, y: centerToBase },
      stiffness: 1,
      length: 0,
    });

    const centerRightConstraint = Constraint.create({
      bodyA: circleCenter,
      pointA: { x: xRelativeToCircleOrigin, y: yRelativeToCircleOrigin },
      bodyB: newSpoke,
      pointB: { x: halfBase, y: centerToBase },
      stiffness: 1,
      length: 0,
    });

    const centerToTip = -(2 / 3) * outerRadius;
    const tipConstraint = Constraint.create({
      bodyA: circleCenter,
      bodyB: newSpoke,
      pointB: { x: 0, y: centerToTip },
      length: outerRadius,
      stiffness: 1,
    });

    Composite.add(windmill, [newSpoke, centerMiddleConstraint, centerRightConstraint, centerLeftConstraint]);
    Body.rotate(newSpoke, degreesToRadians(angleDegrees), { x, y });
    Body.setVelocity(newSpoke, { x: 0, y: 0 });

    // incremement angle rotation
    angleDegrees += angleAddition;
    if (angleDegrees >= 360) angleDegrees -= 360;
  }

  World.add(world, windmill);
  return windmill;
}

function addMouseControl(panel) {
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

  World.add(panel.world, mouseConstraint);

  // keep the mouse in sync with rendering
  panel.render.mouse = mouse; //eslint-disable-line
}

function addListeners(panel) {
  // const breakButton = document.querySelector('#breakThings');
  // breakButton.addEventListener('click', toggleGravity);

  Events.on(panel.engine, 'afterUpdate', () => {
    // const pyraBodiesStartPoint = { x: 650, y: 50 };
    // teleportBodies(pyraComposite, pyraBodiesStartPoint, 'x');
    // spinSpinners(spinners);
  });

  // window.addEventListener('mousedown', () => {
  //   const properties = {
  //     angle: Math.PI / 2,
  //     friction: 0,
  //     frictionStatic: 0,
  //     restitution: 1,
  //     render: {
  //       fillStyle: 'red',
  //     },
  //     collisionFilter: {
  //       category: particleCategory,
  //     },
  //   };
  //   // const tri = getTriangle(mouse.position.x, mouse.position.y + 5, 10, properties);
  //   const body = Bodies.circle(mouse.position.x, mouse.position.y, 5, properties);
  //   World.add(world, body);
  // });
  // // TODO: maybe put this in landingMatter.js
  // window.addEventListener('resize', () => {
  //   if (window.innerWidth > canvasSize.width) {
  //     render.options.width = canvasSize.width * 2;
  //     render.options.height = canvasSize.height * 2;
  //     Render.lookAt(render, {
  //       min: { x: 0, y: 0 },
  //       max: { x: canvasSize.width * 2, y: canvasSize.height * 2 },
  //     });
  //   }
  // });
}


function createSpinner() {
  const centerPoint = { x: 400, y: 300 };
  const circleRadius = 25;

  // const rectangle1 = Bodies.rectangle(400, 300, 300, 10, {
  //   collisionFilter: {
  //     mask: triangleCategory, //eslint-disable-line
  //   },
  // });

  const triHeight = 300;
  const triBase = circleRadius * 2;
  // const triOne = getIsoscelesTriangle(centerPoint.x, centerPoint.y, triBase, triHeight);
  const windmill = createWindmill(centerPoint.x,
    centerPoint.y, circleRadius, triHeight, triBase, DARK_BLUE, 3);

  return windmill;
}

// begin main
// createWalls(canvasSize.width, canvasSize.height);
addAllSVGsToCanvas();
// const pyra = createRotatedTrianglePyramid(450, 50, 20, 20, 0, 0);
// const spinner = createSpinner();
Object.keys(allCanvases).forEach((panelName) => {
  addListeners(allCanvases[panelName]);
});

// fit the render viewport to the scene
// Render.lookAt(render, {
//   min: { x: 0, y: 0 },
//   max: { x: canvasSize.width, y: canvasSize.height },
// });
