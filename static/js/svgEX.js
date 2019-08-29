/* eslint-disable */
var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Vertices = Matter.Vertices,
        Svg = Matter.Svg,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    Engine.run(engine)
    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false,
        }
    });

    Render.run(render);

    // add bodies
    World.add(world, [
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // const svgRAW = ['M1003','7.57c0','191.47-26.77','954.6-716.62','954.6H1003Z'];
    const curveSmallRAW = 'M 175,0 c 0,35.1 4.9,175 131.4,175 H 175 V 0 z';
    const curveSmallURL = './static/svg/CurveSmall.svg';

    function renderAndAddSVG(svgVertexSets) {
        const svg = Bodies.fromVertices(400, 350, svgVertexSets, {
                isStatic: true,
                render: {
                    fillStyle: '#2e2b44',
                    strokeStyle: '#2e2b44',
                    lineWidth: 1
                }
            }, true);

        World.add(world, svg);
    }

    function makeSVGjQueryRequest(url) {
        // does the same thing as the XML request version (see below).
        // obviously prettier to read, but use requires jQuery
        $.get(url).done((data) => {
            let vertexSets = [];

            $(data).find('path').each(function(i, path) {
                // NOTE FOR FUTURE USE:
                // Svg.pathToVertices requires an HTML DOM element,
                // not just a string with the appropriate points
                vertexSets.push(Svg.pathToVertices(path, 30));
            });

            // add these vertices to the world
            renderAndAddSVG(vertexSets);

        });
    }

    function makeSVGXMLRequest(url) {
        // Reads external svg file using XML request
        // upon success, renders and adds to the existing world
        const xhr = new XMLHttpRequest();
        const vertexSets = [];

        // Define the function that will run upon receiving a response
        xhr.onload = () => {

            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                // Successful request
                let tags = xhr.responseXML.all;
                let paths = [];
                for(let i = 0; i < tags.length; ++i){
                    if (tags[i].tagName === 'path') {
                        paths.push(tags[i]);
                    }
                }
                const vertexSets = []
                for (let j = 0; j < paths.length; ++j) {
                    // NOTE FOR FUTURE USE:
                    // Svg.pathToVertices requires an HTML DOM element,
                    // not just a string with the appropriate points
                    vertexSets.push(Svg.pathToVertices(paths[j], 30));
                }

                // add these vertices to the world
                renderAndAddSVG(vertexSets);

            } else {
                // Failed Request
                console.log('The svg request failed.');
            }
        };
        // Create and send a GET request
        xhr.open('GET', url);
        xhr.send();
    }

    makeSVGXMLRequest(curveSmallURL);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    const circ = Bodies.circle(500, 450, 10);
    World.add(world, circ);

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });