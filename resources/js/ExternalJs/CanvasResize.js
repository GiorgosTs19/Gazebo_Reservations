import Konva from "konva";

export function resizeCanvas(canvas, image, areas, layer,Gazepos) {
    let shapes = [];
    let imageLoaded = false;
    let resizeTimeout = null;
    function handleLoad() {
        imageLoaded = true;
        resize();
    }
    function resize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = image.offsetWidth;
            canvas.height = image.offsetHeight;
            redrawShapes();
        }, 250); // Adjust the delay as needed
    }

    function getID(number) {
        for(let gazepo of Gazepos){
            if(parseInt(gazepo.ascending_number) === parseInt(number))
                return gazepo.id;
        }
    }

    function redrawShapes() {
        shapes = [];
        if (!imageLoaded) return;
        const ctx = canvas.getContext('2d',{willReadFrequently:true});
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        layer.removeChildren();
        areas.forEach(function(area,index) {
            const coords = area.getAttribute('coords').split(',').map(parseFloat);
            const shape = area.getAttribute('shape');
            if (shape === 'circle' && coords.length === 3) {
                const centerY = coords[1] * (canvas.height / image.offsetHeight);
                const radius = coords[2] * Math.min(canvas.width / image.offsetWidth, canvas.height / image.offsetHeight);
                const TableArea = areas[index+1];
                const TableCoords = TableArea.getAttribute('coords').split(',').map(parseFloat);
                const TableX = TableCoords[0] * (canvas.width / image.offsetWidth);
                const x = area.getAttribute('color')==='#FF5733' ? TableX : TableX-1+radius/2;
                if(!isNaN(x) || !isNaN(centerY) || !(isNaN(radius))){
                    const availabilityText = new Konva.Text({
                        name:area.id,
                        x: x,
                        y: centerY,
                        text: area.getAttribute('color')==='#FF5733' ? 'Unavailable':'Available',
                        fontSize: radius,
                        fontFamily: 'Calibri',
                        fill: area.getAttribute('color'),
                    });
                    shapes = [...shapes,availabilityText];
                    layer.add(availabilityText);
                }
            }
            else if (shape === 'rect' && coords.length === 4) {
                const x = coords[0] * (canvas.width / image.offsetWidth);
                const y = coords[1] * (canvas.height / image.offsetHeight);
                const width = (coords[2] - coords[0]) * (canvas.width / image.offsetWidth);
                const height = (coords[3] - coords[1]) * (canvas.height / image.offsetHeight);
                const AvailabilityArea = areas[index-1];
                if(!isNaN(x) || !isNaN(y) || !isNaN(width) || !isNaN(height)){
                    const gazepoRect = new Konva.Rect({
                        id:getID(area.title.split(' ')[1]),
                        name:area.title,
                        x: x,
                        y: y,
                        width: width,
                        height: height,
                        stroke: AvailabilityArea.getAttribute('color')==='#FF5733' ? 'transparent':'black',
                        strokeWidth: 1.5,
                    });
                    shapes = [...shapes,gazepoRect];
                    AvailabilityArea.getAttribute('color')==='#00A36C' && gazepoRect.on('pointerover',()=>{gazepoRect.opacity(0.3)})
                    AvailabilityArea.getAttribute('color')==='#00A36C' && gazepoRect.on('pointerout',()=>{gazepoRect.opacity(1)})
                    layer.add(gazepoRect);
                }
            }
            layer.batchDraw();
            console.log(shapes)
        });
    }

    function initializeMapComponent() {
        image.addEventListener('load', handleLoad);

        return () => {
            image.removeEventListener('load', handleLoad);
        };
    }

    window.addEventListener('resize', resize);
    resize();

    return initializeMapComponent();
}
// const circle = new Konva.Circle({
//     name:area.id,
//     x: centerX,
//     y: centerY,
//     radius: radius,
//     fill: area.getAttribute('color'),
//     stroke: 'black',
//     strokeWidth: 0.2,
// });
// circle.on('pointerdown',()=>{console.log(circle.name())})
