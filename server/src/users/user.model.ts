export class UserModel {
  public name: string;
  public img: string;
  public id: string;
  constructor(name: string, img: string, id: string) {
    this.name = name;
    this.img = img;
    this.id = id;
  }
}
