import React from 'react';
import Game from './Game';


class  Home extends React.Component {

  render(){
    return(


      <Game randomNumberCount={6} initialSeconds={10} />


    );
  }


}

// const styles = StyleSheet.create({
//   container: {
//     flex : 1,
//     backgroundColor:'#ddd',
//   }
//
//
// });


export default Home;
