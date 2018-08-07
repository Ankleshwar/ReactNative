import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

import {View,Text,StyleSheet} from 'react-native';


class  Game extends React.Component {

static propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initialSeconds : PropTypes.number.isRequired,
};

state = {
  selectedIds: [],
  remainingSeconds: this.props.initialSeconds,
};


isNumberSelected = (numberIndex) => {
  // console.log(this.state.selectedIds);
  // console.log(numberIndex);
  return this.state.selectedIds.indexOf(numberIndex) >= 0;
};

selectNumber = (numberIndex) => {
  this.setState((prevState) => ({
    selectedIds : [...prevState.selectedIds,numberIndex],
  }));
};

componentDidMount(){
  this.intervalId  =  setInterval(() =>{
    this.setState((prevState)  =>{
      return{remainingSeconds: prevState.remainingSeconds -1};
    }, () => {
      if (this.state.remainingSeconds == 0){
        clearInterval(this.intervalId);
      }
    });
  },1000);
}


componentWillUnMount(){
  clearInterval(this.intervalId);
}

gameStatus = () => {
  const sumSelected = this.state.selectedIds.reduce((acc,curr) => {
    return acc + this.randomNumbers[curr];
  },0);
  console.log(sumSelected);
  if (this.state.remainingSeconds == 0){
    return 'LOSS';
  }

  if(sumSelected < this.target){
    return 'PLAYING';
  }
  if(sumSelected === this.target){
    return 'WON';
  }
  if(sumSelected > this.target){
    return 'LOSS';
  }
}

targetPanelStyle = (status) => {
  console.log('Hi') ;
  if (status === 'WON'){
    console.log('WON') ;
    return styles.STATUS_WON ;
  }
  if (status === 'LOSS'){
    console.log('LOSS') ;
    return styles.STATUS_LOSS ;
  }
  if (status === 'PLAYING'){
    console.log('PLAYING') ;
    return styles.STATUS_PLAYING ;
  }
};

randomNumbers = Array.from({length:this.props.randomNumberCount})
  .map(()=>1 + Math.floor(10 * Math.random()))

//  target =  10 + Math.floor(40 * Math.random());
target =  this.randomNumbers.slice(0, this.props.randomNumberCount - 3)
  .reduce((acc,curr)=> acc+curr,0)

render(){
  const gameStatusCurr    =  this.gameStatus();
  return(
    <View style={styles.container}>
      <Text style={[styles.target,this.targetPanelStyle(gameStatusCurr)]}>{this.target}</Text>
      <View style={styles.randomContainer}>
        {this.randomNumbers.map((randomNumber,index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisable={this.isNumberSelected(index) || gameStatusCurr !== 'PLAYING'}
            onPress={this.selectNumber}
          />


        )}

      </View>
      <Text>{this.state.remainingSeconds}</Text>
    </View>


  );
}


}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor:'white',
    paddingTop:30,
  },
  target: {
    fontSize:50,
    backgroundColor:'#bbb',
    margin:50,
    textAlign:'center',
  },

  randomContainer:{
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  random:{
    backgroundColor: '#999',
    width:100,
    marginHorizontal:15,
    marginVertical:25,
    fontSize:35,
    textAlign:'center',
  },

  STATUS_WON: {
    backgroundColor : 'green',
  },
  STATUS_LOSS: {
    backgroundColor : 'red',
  },
  STATUS_PLAYING: {
    backgroundColor : '#bbb',
  },

});


export default Game;
