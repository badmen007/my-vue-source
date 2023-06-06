import { nodeOPs } from "./nodeOps";
import { patchProp } from "./props";

const renderOptions = { ...nodeOPs, patchProp };

console.log(renderOptions)
