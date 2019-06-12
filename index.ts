import { Observable, PartialObserver } from 'rxjs';

interface TransmitterData {
  spaceshipId: string;
  planet: string;
}

const transmitterObservable$ = new Observable<TransmitterData>(subscriber => {
  const planets: string[] = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  const spaceshipId: string = `${Math.floor(Math.random() * 1000)}`;

  planets.forEach((planet: string) => subscriber.next({planet, spaceshipId}));

  subscriber.complete();

  //subscriber.next('Pluto');
});

const spaceshipControlRoomObserver: PartialObserver<TransmitterData> = {
  next(transmittedData: TransmitterData) { console.log(`Spaceship #${transmittedData.spaceshipId} passed by ${transmittedData.planet}.`); },
  error(err) { console.error(`Ooops, something went terribly wrong: ${err}`); },
  complete() { console.log('Spaceship reached its final destination!'); }
};

const earthControlRoomObserver: PartialObserver<TransmitterData> = {
  next(transmittedData: TransmitterData) { console.log(`Spaceship #${transmittedData.spaceshipId} reported passing by ${transmittedData.planet}.`); },
  error(err) { console.error(`Lost connection: ${err}`); },
  complete() { console.log('Spaceship reported reaching its final destination!'); }
};

console.log('Are Observables asynchronous?');
transmitterObservable$.subscribe(spaceshipControlRoomObserver);
transmitterObservable$.subscribe(earthControlRoomObserver);
//console.log('Here is the answer: YES/NO');