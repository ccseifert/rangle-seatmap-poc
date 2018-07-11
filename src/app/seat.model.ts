export class Seat {
  public id: string;
  public x: string;
  public y: string;
  public floor: number;

  constructor(id: string, x: string, y: string, floor: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.floor = floor;
  }
}
