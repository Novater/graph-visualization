import produce from 'immer';
import {
    GRAPH_INITIALIZE_ERROR,
    GRAPH_INITIALIZE_SUCCESS,
    GRAPH_INITIALIZE
} from '../actions/graphActions';

const initialState = {
    graphData: {}
};

const graphReducer = (state = initialState, action) => {
    switch (action.type) {
        case GRAPH_INITIALIZE: {
            return produce(state, (newState) => {
                newState.graphData = {
                    "nodes": [ 
                        { 
                            "id": "id1",
                            "name": "name1",
                            "val": 1 
                        },
                        { 
                            "id": "id2",
                            "name": "name2",
                            "val": 10 
                        }
                    ],
                    "links": [
                        {
                            "source": "id1",
                            "target": "id2"
                        }
                    ]
                };
            });
        }
        default: {
            return state;
        }
    }
};

export default graphReducer;
