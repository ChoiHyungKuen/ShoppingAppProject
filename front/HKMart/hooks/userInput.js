import { useState, useCallback } from 'react';

export default ({ initialValue = null }) => {

    const [value, setValue] = useState(initialValue);

    const handler = useCallback((input) => {
        setValue(input);
    }, []);

    return [value, handler, setValue];
}
