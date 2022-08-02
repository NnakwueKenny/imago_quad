import './App.css';
import React from 'react';
import GameData from './GameData';
import Header from './components/Header';
import WinConfetti from './components/WinConfetti';

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
      GameData.forEach(data => {
        if (data.id === gameItemID) {
          gameItemClass = data.class
        }
      })
      
      return {
        playState: false,
        nextLevel: false,
        hintQuantity: 10,
        gameItemID: gameItemID,
        generatedIDs: generatedIDs,
        gameItemClass: gameItemClass,
      }
    }
  }
  
  const [gameValues, setGameValues] = React.useState(() => fromLocalStorage());

  React.useEffect(() => {
    console.log('Justing testing useEffect')
  },[gameValues]);

  const handleClick = (e) => {
    console.log(e.target);
    
  }
  return (
    <div className='App flex flex-col h-screen overflow-y-auto'>
      <Header
        hintQuantity = {gameValues.hintQuantity}
      />
      {/* <WinConfetti /> */}
      {/* MainPage SECTION STARTS HERE*/}
        <div className='MainPage hidden flex flex-col h-3/5 justify-center items-center pt-20'>
          <div className='relative'>
            <div className='PictureGrid max-w-xl grid gap-2 px-8 grid-cols-2'>
              <div className='rounded-md overflow-hidden h-32 md:h-44'>
                <img className='w-full h-full object-cover' src='https://guardian.ng/wp-content/uploads/2016/10/family.jpg' alt='imgClass'/>
              </div>
              <div className='rounded-md overflow-hidden h-32 md:h-44'>
                <img className='w-full h-full object-cover' src='https://cf.ltkcdn.net/family/images/std/200821-800x533r1-family.webp' alt='imgClass'/>
              </div>
              <div className='rounded-md overflow-hidden h-32 md:h-44'>
                <img className='w-full h-full object-cover' src='https://guardian.ng/wp-content/uploads/2019/12/Family.jpg' alt='imgClass'/>
              </div>
              <div className='rounded-md overflow-hidden h-32 md:h-44'>
                <img className='w-full h-full object-cover' src='https://guardian.ng/wp-content/uploads/2016/10/family.jpg' alt='imgClass'/>
              </div>
            </div>
            <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full'>
              <span className='animate-pulse flex justify-center items-center h-12 w-12 text-green-500 bg-white rounded-full border-2 border-green-400'>0</span>
            </div>
          </div>
          <div className='w-full px-8 py-4'>
            <button className='text-lg font-semibold rounded border-2 border-green-500 text-green-500 w-full max-w-sm py-2'>Play</button>
          </div>
        </div>
      {/* MainPage SECTION ENDS HERE*/}

      {/* GamePanel SECTION STARTS HERE*/}
        <div className='GamePanel'>
          <div className='flex flex-col lg:flex-row h-full justify-center items-center gap-y-4 md:gap-8 px-4'>
            {/* PictureGrid SECTION STARTS HERE*/}
              <div className='PictureGrid max-w-xl grid gap-4 px-4 grid-cols-2'>
                <div className='rounded-md overflow-hidden h-32 md:h-44'>
                  <img className='w-full h-full object-cover' src='https://guardian.ng/wp-content/uploads/2016/10/family.jpg'/>
                </div>
                <div className='rounded-md overflow-hidden h-32 md:h-44'>
                  <img className='w-full h-full object-cover' src='https://cf.ltkcdn.net/family/images/std/200821-800x533r1-family.webp'/>
                </div>
                <div className='rounded-md overflow-hidden h-32 md:h-44'>
                  <img className='w-full h-full object-cover' src='https://guardian.ng/wp-content/uploads/2019/12/Family.jpg'/>
                </div>
                <div className='rounded-md overflow-hidden h-32 md:h-44'>
                  <img className='w-full h-full object-cover' src='https://guardian.ng/wp-content/uploads/2016/10/family.jpg'/>
                </div>
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
                      <button onClick={handleClick} className='block w-7 h-7 text-green-50 bg-green-500 hover:text-green-500 hover:bg-transparent border border-green-500 rounded'>1</button>
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
      {/* GamePanel SECTION ENDS HERE*/}

      {/* NextLevel SECTION STARTS HERE*/}
        <div className='NextLevel hidden flex flex-col h-full justify-center'>
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
      {/* NextLevel SECTION ENDS HERE*/}
    </div>
  );
}

export default App;