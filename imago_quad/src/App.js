import './App.css';
import React from 'react';
import GameData from './GameData';
import Header from './components/Header';
// import WinConfetti from './components/WinConfetti';

const App = () => {
  const fromLocalStorage = () => {
    const fromLocal = localStorage.getItem('gameData');
    if (fromLocal) {
      return fromLocal;
    } else if (fromLocal === null) {
      const gameIDs = [];
      GameData.forEach(item => {
        gameIDs.push(item.id)
      });
      const gameItemID = gameIDs[(Math.ceil(Math.random() * gameIDs.length))];
      const generatedIDs = [];
      generatedIDs.push(gameItemID);
      
      let gameItemClass;
      let imgSrcs;
      GameData.forEach(data => {
        if (data.id === gameItemID) {
          gameItemClass = data.class
          imgSrcs = data.src
        }
      })
      let inputDisplayArray = [];
      const additionalValues = 'abcdefghijklmnopqrstuvwxyz';
      let randomAdditionalValues = [];
      while (randomAdditionalValues.length < 3) {
        let randNum = Math.floor(Math.random() * additionalValues.length)
        if (randomAdditionalValues.indexOf(additionalValues[randNum]) === -1) {
          randomAdditionalValues.push(additionalValues[randNum])
        } else {
          console.log('You don mad!')
        }
      }
      let temporaryInputArray = []
      for (const item of gameItemClass) {
        temporaryInputArray.push(item)
      }
      let cummulativeDisplayArray = [...temporaryInputArray, ...randomAdditionalValues];
      let randomCummulativeDisplayArray = [];
      let temporaryCummulativeDisplayArray = [];

      while (temporaryCummulativeDisplayArray.length < cummulativeDisplayArray.length) {
        let randNum = Math.floor(Math.random() * cummulativeDisplayArray.length);
        if (temporaryCummulativeDisplayArray.indexOf(randNum) === -1) {
          temporaryCummulativeDisplayArray.push(cummulativeDisplayArray[randNum])
        } else {
          console.log('Getat')
        }
      }
      inputDisplayArray = temporaryCummulativeDisplayArray;
      console.log(inputDisplayArray)

      return {
        imgSrcs: imgSrcs,
        playState: true,
        nextLevel: false,
        hintQuantity: 100000,
        gameItemID: gameItemID,
        generatedIDs: generatedIDs,
        gameItemClass: gameItemClass,
        inputDisplayArray: inputDisplayArray
      }
    }
  }
  const [gameValues, setGameValues] = React.useState(() => fromLocalStorage());
  function togglePlay () {
    setGameValues(prevValues => {
      return {
        ...prevValues,
        playState: !prevValues.playState
      }
    })
  }

  React.useEffect(() => {
    console.log('Justing testing useEffect')
  },[gameValues]);

  const handleClick = (e) => {
    console.log(e.target.textContent);
  }
  return (
    <div className='App flex flex-col h-screen overflow-y-auto'>
      <Header
        hintQuantity = {gameValues.hintQuantity}
        togglePlay = {togglePlay}
        playState = {gameValues.playState}
      />
      {/* <WinConfetti /> */}
      {/* MainPage SECTION STARTS HERE*/}
        {
          !gameValues.playState &&
          <div className={`MainPage flex flex-col h-3/5 justify-center items-center pt-20`}>
            <div className='relative'>
              <div className='PictureGrid max-w-xl grid gap-2 px-8 grid-cols-2'>
                {gameValues.imgSrcs.map((imgSrc, index) => {
                    return <div className='rounded-md overflow-hidden h-32 md:h-44'>
                            <img alt='img' key={index} className='w-full h-full object-cover' src={imgSrc}/>
                          </div>
                  })}
              </div>
              <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full'>
                <span className='animate-pulse flex justify-center items-center h-12 w-12 text-green-500 bg-white rounded-full border-2 border-green-400'>0</span>
              </div>
            </div>
            <div className='w-full px-8 py-4'>
              <button onClick={togglePlay} className='text-lg font-semibold rounded border-2 border-green-500 text-green-500 w-full max-w-sm py-2'>Play</button>
            </div>
          </div>
        }
      {/* MainPage SECTION ENDS HERE*/}

      {/* GamePanel SECTION STARTS HERE*/}
        {
          gameValues.playState &&
          <div className='GamePanel'>
            <div className='flex flex-col lg:flex-row h-full justify-center items-center gap-y-4 md:gap-8 px-4'>
              {/* PictureGrid SECTION STARTS HERE*/}
                <div className='PictureGrid max-w-xl grid gap-4 px-4 grid-cols-2'>
                  {gameValues.imgSrcs.map((imgSrc, index) => {
                    return <div className='rounded-md overflow-hidden h-32 md:h-44'>
                            <img alt='img' key={index} className='w-full h-full object-cover' src={imgSrc}/>
                          </div>
                  })}
                </div>
              {/* PictureGrid SECTION ENDS HERE*/}
              
              {/* GameInteraction SECTION STARTS HERE*/}
                <div className='GameInteraction flex flex-col h-full justify-center items-center gap-10 md:gap-16 p-4'>
                  {/* OutputDisplayPanel SECTION STARTS HERE*/}
                    <div className='flex gap-2'>
                      <button className='block w-7 h-7 text-green-500 hover:text-green-50 hover:bg-green-500 border border-green-500 rounded'>1</button>
                    </div>
                  {/* OutputDisplayPanel SECTION ENDS HERE*/}
                  
                  {/* InputDisplayPanel SECTION STARTS HERE*/}
                    <div className='flex items-start gap-4'>
                      <div className='grid grid-cols-6 gap-2'>
                      {
                        gameValues.inputDisplayArray.map(item => {
                          return <button onClick={handleClick} className='block uppercase w-7 h-7 text-green-50 bg-green-500 hover:text-green-500 hover:bg-transparent border border-green-500 rounded'>{item}</button>
                        })
                      }
                      </div>
                      <div>
                        <button className='flex flex-col justify-center items-center w-8 h-16 text-red-500 bg-white border border-red-500 rounded'>
                            <span className='text-xs font-semibold italic'>Hint</span>
                            <div className='flex flex-col'>
                              <span className='block text-xs'>-20</span>
                              <span className='block text-sm text-yellow-400'><i className='fa fa-coins'></i></span>
                            </div>
                        </button>
                      </div>
                    </div>
                  {/* InputDisplayPanel SECTION ENDS HERE*/}
                </div>
              {/* GameInteraction SECTION ENDS HERE*/}
            </div>
          </div>
        }
      {/* GamePanel SECTION ENDS HERE*/}

      {/* NextLevel SECTION STARTS HERE*/}
        {
          !gameValues.playState && gameValues.nextLevel &&
          <div className='NextLevel flex flex-col h-full justify-center'>
            <div className='flex flex-col justify-between w-full h-4/5 max-w-3xl'>
              <div className='text-green-500 text-xl font-semibold'><span>Level Passed</span></div>
              <div className='flex flex-col text-green-500 text-xl font-semibold'>
                <span>0</span>
                <span className='text-yellow-500'><i className='fa fa-coins'></i><i className='fa fa-coins'></i></span>
              </div>
              <div className='flex justify-center gap-x-1.5 text-green-500 text-xl font-semibold'>
                <button className='block w-7 h-7 text-sm font-semibold text-green-500 hover:text-green-50 hover:bg-green-500 border border-green-500 rounded'>1</button>
                <button className='block w-7 h-7 text-sm font-semibold text-green-500 hover:text-green-50 hover:bg-green-500 border border-green-500 rounded'>1</button>
                <button className='block w-7 h-7 text-sm font-semibold text-green-500 hover:text-green-50 hover:bg-green-500 border border-green-500 rounded'>1</button>
                <button className='block w-7 h-7 text-sm font-semibold text-green-500 hover:text-green-50 hover:bg-green-500 border border-green-500 rounded'>1</button>
                <button className='block w-7 h-7 text-sm font-semibold text-green-500 hover:text-green-50 hover:bg-green-500 border border-green-500 rounded'>1</button>
              </div>
              <div className='flex justify-center text-green-500 text-xl font-semibold'>
                <button className='w-32 py-1 font-semibold rounded border border-green-500'>Next Level</button>
              </div>
            </div>
          </div>
        }
      {/* NextLevel SECTION ENDS HERE*/}
    </div>
  );
}

export default App;