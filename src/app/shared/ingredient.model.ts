export class Ingredient {
  // Typescript allows for assigning properties in the constructor in this way
  // not sure I like it, but it's nice when you don't need anything but assignment
  constructor(public id: number, public name: string, public amount: number) {}
}