export class Map {
  public id: string;
  public file: string;
  public path: string;
  public personCardX: number;
  public personCardY: number;
  public personCardHeight: number;
  public personCardWidth: number;

  constructor(
    id: string,
    file: string,
    path: string,
    personCardX: number,
    personCardY: number,
    personCardHeight: number,
    personCardWidth: number
  ) {
    this.id = id;
    this.path = path;
    this.file = file;
    this.personCardX = personCardX;
    this.personCardY = personCardY;
    this.personCardHeight = personCardHeight;
    this.personCardWidth = personCardWidth;
  }
}
