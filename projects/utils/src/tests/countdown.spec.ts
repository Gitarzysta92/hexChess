import { Countdown, CountdownSetup } from '../countdown';

jest.useFakeTimers();

describe('countdown with single default step', () => {
    let countdown: Countdown;
    const time = 1000;

    beforeEach(() => {
      countdown = new Countdown(time);
    });

    it('should be initialized', () => {
      expect(countdown).toBeInstanceOf(Countdown);
    });

    it('should emit value after given amount of time', done => {
      const callback = jest.fn(() => done());
      countdown.completed.subscribe(callback);

      countdown.start();

      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(time);
      expect(callback).toBeCalled();
    });



});







describe('countdown with multiple steps', () => {
  let countdown: Countdown;
  const firstCallback = jest.fn();
  const secondCallback = jest.fn();

  const config: CountdownSetup = [
    {
      id: 'first-step',
      time: 1000,
      next: firstCallback
    },
    {
      id: 'second-step',
      time: 1000,
      next: secondCallback
    }
  ];


  beforeEach(() => {
    countdown = new Countdown(config);
  });

  it('should be initialized', () => {
    expect(countdown).toBeInstanceOf(Countdown);
  });


});





// it('should be initialized', () => {
//   expect(list).toBeInstanceOf(List);
// });


// it('should add item to list', () => {
//   list.add(1);
//   expect(list['_list']).toEqual(
//     expect.arrayContaining([1])
//   );
// });


// it('should remove item form list', () => {
//   const arr = [1,2,3];
//   list['_list'] = arr;
//   list.remove(1);
//   expect(list['_list']).toEqual(
//     expect.arrayContaining([2,3])
//   );
// });


// it('should contains five items for given input', () => {
//   const items = [1,2,3,4,5,6,7];
//   items.forEach(i => list.add(i));
//   expect(list['_list'].length).toEqual(itemsLimit);
// });


// it('should iterate five times for given number of items', () => {
//   const arr = [1,2,3,4,5]; 
//   list['_list'] = arr;
//   let counter = 0;

//   list.forEach(i => counter++);
//   expect(counter).toEqual(arr.length);
// });

// it('should emit new list length while new item was added', done => {
//   const spy = jest.fn();
//   list.listChanged.subscribe(value => {
//     spy();
//     expect(value).toEqual(1);
//     done();
//   })

//   list.add(null);
//   expect(spy).toBeCalled();
// });

// it('should emit new list length while item was removed', () => {
//   const spy = jest.fn();
//   const arr = [1,2,3];
//   list['_list'] = arr;
//   list.listChanged.subscribe(value => {
//     spy();
//     expect(value).toEqual(2)
//   });

//   list.remove(1);
//   expect(spy).toBeCalled();
// });

