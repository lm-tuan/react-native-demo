import  React, { useState, useEffect }  from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

const ActivityIndicatorComponent = (props) => {
    const [status, setStatus] = useState(true);
    
    console.log('isLoading1', status)
    useEffect(() => {
        setStatus(props.loading);
    })

    return (<ActivityIndicator 
        animating={status} 
        color={Colors.blue800} 
        size = "large"
        style ={{
            // backgroundColor:'red',
            position:'relative',
            top:10,
        }}
    />
)};

export default ActivityIndicatorComponent;