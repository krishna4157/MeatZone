import React from 'react';
import SelectLocationScreen from '../components/SelectLocationScreen';

class SelectLocationPage extends React.Component {
    state = {

    };



    async componentDidMount() {

    }

    render() {
        const { navigation } = this.props;
        return (
            <SelectLocationScreen navigation={navigation} />
        );
    }
}




export default SelectLocationPage;