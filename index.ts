import { Observable, PartialObserver, ConnectableObservable } from 'rxjs';
import { publish } from 'rxjs/operators';

interface TransmitterData {
  spaceshipId: string;
  planet: string;
}

const transmitterObservable$ = new Observable<TransmitterData>(subscriber => {
  const planets: string[] = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  const spaceshipId: string = `${Math.floor(Math.random() * 1000)}`;

  planets.forEach((planet: string) => subscriber.next({planet, spaceshipId}));

  subscriber.complete();

  // subscriber.next({ planet: 'Pluto', spaceshipId });
});

const spaceshipControlRoomObserver: PartialObserver<TransmitterData> = {
  next(transmittedData: TransmitterData) { console.log(`[SPACE] Spaceship #${transmittedData.spaceshipId} passed by ${transmittedData.planet}.`); },
  error(err) { console.error(`[SPACE] Ooops, something went terribly wrong: ${err}`); },
  complete() { console.log('[SPACE] Spaceship reached its final destination!'); }
};

const earthControlRoomObserver: PartialObserver<TransmitterData> = {
  next(transmittedData: TransmitterData) { console.log(`[EARTH] Spaceship #${transmittedData.spaceshipId} reported passing by ${transmittedData.planet}.`); },
  error(err) { console.error(`[EARTH] Lost connection: ${err}`); },
  complete() { console.log('[EARTH] Spaceship reported reaching its final destination!'); }
};

console.log('Are Observables asynchronous?');
transmitterObservable$.subscribe(spaceshipControlRoomObserver);
// transmitterObservable$.subscribe(earthControlRoomObserver);
// console.log('Here is the answer: YES/NO');

// const multicastTransmitterObservable$: ConnectableObservable<TransmitterData> = <ConnectableObservable<TransmitterData>>transmitterObservable$.pipe(publish());
// multicastTransmitterObservable$.subscribe(spaceshipControlRoomObserver);
// multicastTransmitterObservable$.subscribe(earthControlRoomObserver);
// multicastTransmitterObservable$.connect();