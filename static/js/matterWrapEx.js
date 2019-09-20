/* eslint-disable */
// install plugin
Matter.use(
  'matter-wrap' // PLUGIN_NAME
);

var Example = Example || {};
const Bodies = Matter.Bodies;

function getIsoscelesTriangle(x, y, base, height, properties, fromBase = true) { // eslint-disable-line
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

Example.basic = function() {
  // module aliases
  var Engine = Matter.Engine,
      Runner = Matter.Runner,
      Render = Matter.Render,
      World = Matter.World,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      Common = Matter.Common,
      Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create();

  // create renderer
  var render = Render.create({
    element: document.querySelector('#canvasContainer'),
    engine: engine,
    options: {
      width: 800,
      height: 600,
      wireframes: false
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  // add some random bodies
  for (var i = 0; i < 150; i += 1) {
    var body = Bodies.polygon(
      Common.random(0, render.options.width),
      Common.random(0, render.options.height),
      // Common.choose([1, 3, 3, 5]),
      3,
      Common.random() > 0.9 ? Common.random(15, 25) : Common.random(5, 10),
      {
        friction: 0,
        frictionAir: 0,

        render: {
          fillStyle: Common.choose(['#C3CCD6', '#4F5357', '#182E45']),
        },

        // set the body's wrapping bounds
        plugin: {
          wrap: {
            min: {
              x: 0,
              y: 0
            },
            max: {
              x: render.canvas.width,
              y: render.canvas.height
            }
          }
        }
      }
    );

    Body.setVelocity(body, {
      x: Common.random(-3, 3) + 3,
      y: Common.random(-3, 3) + 3
    });

    World.add(world, body);
  }

  // add a composite
  // var car = Matter.Composites.car(150, 100, 100, 30, 20);

  // // set the composites's wrapping bounds
  // car.plugin.wrap = {
  //   min: {
  //     x: 0,
  //     y: 0
  //   },
  //   max: {
  //     x: render.canvas.width,
  //     y: render.canvas.height
  //   }
  // };

  // for (i = 0; i < car.bodies.length; i += 1) {
  //   Body.setVelocity(car.bodies[i], {
  //     x: Common.random(-3, 3) + 3,
  //     y: Common.random(-3, 3) + 3
  //   });
  // }

  // World.add(world, car);

  const playerProps = {
    render: {
      fillStyle: 'white',
    },
    plugin: {
      wrap: {
        min: {
          x: 0,
          y: 0
        },
        max: {
          x: render.canvas.width,
          y: render.canvas.height
        }
      }
    },
  }
  const player = getIsoscelesTriangle(400, 300, 100, 300, playerProps);
  // World.add(world, player);

  // add mouse control
  var mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
  });

  World.add(world, mouseConstraint);

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
}

Example.basic();