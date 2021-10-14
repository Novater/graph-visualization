export const DEFAULT_GRAPH_DIMENSION_X = 51;
export const DEFAULT_GRAPH_DIMENSION_Y = 27;
export const DEFAULT_BGC = '#808080';
export const DEFAULT_OPACITY = 0.8;
export const DEFAULT_NODE_COLOR = '#0096FF';
export const DEFAULT_EDGE_COLOR = '#FFFFFF';
export const DEFAULT_LINK_OPACITY = 0.8;
export const DEFAULT_NODE_SIZE = 40;
export const DEFAULT_EDGE_SIZE = 8;
export const DEFAULT_ALPHA = 0.0001;
export const DEFAULT_SCREEN_X = 1100;
export const DEFAULT_SCREEN_Y = 540;
export const MANHATTAN_FACTOR = 1;
export const DIALOG_PROMPT = 'Select a preset graph below, or upload a custom graph to render. Please note that the format of the graph uploaded must be in the form of a m x n 2D array text file, where m and n are greater than 0. Ie. [[0,0,0],[1,0,1],[1,0,0]].'
export const PRESET_WALL_GRAPH = '[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],'
                                + '[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]';
export const PRESET_SPIRAL_GRAPH = '[[1,0,0],[0,0,0],[0,0,0]]';
export default {};