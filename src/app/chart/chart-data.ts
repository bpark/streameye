export class ChartData {
  name: string;
  value: number;

  constructor(value: number, name?: string) {
    this.value = value;
    if (!name) {
      this.name = '' + Math.random();
    } else {
      this.name = name;
    }
  }
}

export class LimitedQueue<T> {

  private items: T[] = [];

  constructor(private limit: number, private empty?: T) {
      for (let i = 0; i < limit; i++) {
        if (empty) {
          this.items.push(empty);
        } else {
          this.items.push(undefined);
        }
      }
  }

  enqueue(item: T): T[] {
    this.items.pop();
    this.items.unshift(item);
    return this.toArray();
  }

  enqueueAll(items: T[]): T[] {
    items.forEach(item => this.enqueue(item));
    return this.toArray();
  }

  toArray(): T[] {
    return this.items;
  }
}

export let chartDataQueue = new LimitedQueue(100);
export let single = chartDataQueue.toArray();
