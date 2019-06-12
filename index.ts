import { Observable } from 'rxjs';



const observable = new Observable(subscriber => {
  const values: string[] = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  values.forEach((value: string) => subscriber.next(value));

  subscriber.complete();

  //subscriber.next('Pluto');
});

console.log('Are Observables asynchronous?');
observable.subscribe({
  next(x) { console.log('Passing by ' + x); },
  error(err) { console.error('Ooops, something went terribly wrong: ' + err); },
  complete() { console.log('Trip finished!'); }
});
//console.log('Here is the answer: YES/NO');