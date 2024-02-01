import { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { places, Place as PlaceInterface } from './util/data';
import { getImageUrl } from './util/util';
import { ImageSizeContext } from './context';

interface Props {
  readonly place: PlaceInterface;
}

function List() {
  const listItems = places.map(place =>
    <div className='List-Item' key={place.id}>
      <Place place={place} />
    </div>
  );

  return (
    <div className='List-Container'>
      {listItems}
    </div>
  );
}

function Place({ place }: Props) {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place }: Props) {
  const imageSize = useContext(ImageSizeContext);

  return (
    <img
      className='Place-Image'
      src={getImageUrl(place.imageId)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}

function ContextContainer() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;

  return (
    <div className='Context-Container'>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <ImageSizeContext.Provider value={imageSize}>
        <List />
      </ImageSizeContext.Provider>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Context
        </p>
      </header>
      <ContextContainer />
    </div>
  );
}

export default App;
