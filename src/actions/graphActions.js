export const GRAPH_INITIALIZE_ERROR = 'graph/initialize-error';
export const GRAPH_INITIALIZE_SUCCESS = 'graph/initialize-success';
export const GRAPH_INITIALIZE = 'graph/initialize';

export function initialize() {
    return async (dispatch) => {
        try {
            dispatch({ type: GRAPH_INITIALIZE });

            dispatch({
                type: GRAPH_INITIALIZE_SUCCESS
            });
        } catch (error) {
            dispatch({ type: GRAPH_INITIALIZE_ERROR });
            throw error;
        }
    };
}