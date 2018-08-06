import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Game from './Game'


class  Home extends React.Component {

  render(){
    return(


      <Game randomNumberCount={8} />


    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor:'#ddd',
  }


});


export default Home;
