import {
  parse,
  serialize,
  scalePath,
  relative,
  absolute,
  PathSegments
} from '../src/index';

// Get elements
const pathInput = document.getElementById('pathInput') as HTMLTextAreaElement;
const scaleXInput = document.getElementById('scaleX') as HTMLInputElement;
const scaleYInput = document.getElementById('scaleY') as HTMLInputElement;
const btnScale = document.getElementById('btnScale') as HTMLButtonElement;
const btnRelative = document.getElementById('btnRelative') as HTMLButtonElement;
const btnAbsolute = document.getElementById('btnAbsolute') as HTMLButtonElement;
const pathOriginal = document.querySelector('#svgOriginal path') as SVGPathElement;
const pathTransformed = document.querySelector('#svgTransformed path') as SVGPathElement;
const outputString = document.getElementById('outputString');

// Check if all elements were found
if (!pathInput || !scaleXInput || !scaleYInput || !btnScale || !btnRelative || !btnAbsolute || !pathOriginal || !pathTransformed || !outputString) {
  throw new Error('Demo HTML elements not found!');
}

let currentSegments: PathSegments | null = null;

// Pass confirmed elements as arguments
function updateDisplay(
  outStringEl: HTMLElement,
  transformedSegments: PathSegments | null = null
) {
  const inputPath = pathInput.value.trim();
  pathOriginal.setAttribute('d', inputPath);
  outStringEl.textContent = ''; // Clear previous string
  pathTransformed.setAttribute('d', ''); // Clear transformed path

  if (!inputPath) {
    currentSegments = null;
    return;
  }

  try {
    currentSegments = parse(inputPath);

    if (transformedSegments) {
      const transformedPathString = serialize(transformedSegments);
      pathTransformed.setAttribute('d', transformedPathString);
      outStringEl.textContent = transformedPathString;
    } else {
      pathTransformed.setAttribute('d', inputPath);
      outStringEl.textContent = inputPath;
    }
  } catch (error) {
    console.error("Error processing path:", error);
    outStringEl.textContent = `Error: ${(error as Error).message}`;
    currentSegments = null;
  }
}

// Event Listeners
btnScale.addEventListener('click', () => {
  if (!currentSegments) return;
  const sx = parseFloat(scaleXInput.value) || 1;
  const sy = parseFloat(scaleYInput.value) || 1;
  try {
    const scaledPath = scalePath(pathInput.value.trim(), sx, sy);
    updateDisplay(outputString, parse(scaledPath));
  } catch (error) {
    console.error("Error scaling path:", error);
    outputString.textContent = `Error: ${(error as Error).message}`;
  }
});

btnRelative.addEventListener('click', () => {
  if (!currentSegments) return;
  try {
    const relativeSegments = relative(currentSegments);
    updateDisplay(outputString, relativeSegments);
  } catch (error) {
    console.error("Error converting to relative:", error);
    outputString.textContent = `Error: ${(error as Error).message}`;
  }
});

btnAbsolute.addEventListener('click', () => {
  if (!currentSegments) return;
  try {
    const absoluteSegments = absolute(currentSegments);
    updateDisplay(outputString, absoluteSegments);
  } catch (error) {
    console.error("Error converting to absolute:", error);
    outputString.textContent = `Error: ${(error as Error).message}`;
  }
});

pathInput.addEventListener('input', () => updateDisplay(outputString));

// Initial display - pass the confirmed non-null elements
updateDisplay(outputString);
