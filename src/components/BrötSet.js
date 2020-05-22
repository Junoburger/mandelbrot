import Sketch from "react-p5";

export const BrötSet = () => {
  let minSlider;
  let maxSlider;

  function setup(p5, canvasParentRef) {
    p5.createCanvas(360, 360).parent(canvasParentRef);
    p5.pixelDensity(1);
    minSlider = p5.createSlider(-2.5, 0, -2.5, 0.01);
    maxSlider = p5.createSlider(0, 2.5, 2.5, 0.01);
  }

  function draw(p5) {
    let maxIterations = 100;
    p5.loadPixels();
    for (let x = 0; x < p5.width; x++) {
      for (let y = 0; y < p5.height; y++) {
        let a = p5.map(x, 0, p5.width, minSlider.value(), maxSlider.value());
        let b = p5.map(y, 0, p5.height, minSlider.value(), maxSlider.value());

        let ca = a;
        let cb = b;

        let n = 0;

        while (n < maxIterations) {
          let aa = a * a - b * b;
          let bb = 2 * a * b;

          a = aa + ca;
          b = bb + cb;
          if (p5.abs(a + b) > 16) {
            break;
          }

          n++;
        }

        let bright = p5.map(n, 0, maxIterations, 0, 1);
        bright = p5.map(p5.sqrt(bright), 0, 1, 0, 255);

        if (n === maxIterations) {
          bright = 0;
        }

        let pix = (x + y * p5.width) * 4;
        p5.pixels[pix + 0] = bright;
        p5.pixels[pix + 1] = bright;
        p5.pixels[pix + 2] = bright;
        p5.pixels[pix + 3] = 255;
      }
    }
    p5.updatePixels();
  }

  return (
    <>
      <Sketch setup={setup} draw={draw} />
    </>
  );
};
