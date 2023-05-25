class Room {
  private height: number;
  private width: number;

  constructor(x: number, y: number) {
    this.width = x;
    this.height = y;
  }

  // definir si la position est valide en fonction de la piece
  isValidPosition(x: number, y: number): boolean {
    let isValid: boolean = false;
    if (x < this.width && x >= 0 && y < this.height && y >= 0) {
      isValid = true;
      return isValid;
    } else {
      return isValid;
    }
  }
}

enum Cardinal {
  North = "N",
  East = "E",
  West = "W",
  South = "S",
}

class Vacuum {
 private x: number;
 private y: number;
 private direction: Cardinal;

  constructor(x: number, y: number, direction: Cardinal) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  // fonction pour tourner a droite
 private turnRight() {
    switch (this.direction) {
      case Cardinal.North:
        this.direction = Cardinal.East;
        break;
      case Cardinal.East:
        this.direction = Cardinal.South;
        break;
      case Cardinal.South:
        this.direction = Cardinal.West;
        break;
      case Cardinal.West:
        this.direction = Cardinal.North;
        break;
    }
  }
  // fonction pour tourner a gauche
 private turnLeft() {
    switch (this.direction) {
      case Cardinal.North:
        this.direction = Cardinal.West;
        break;
      case Cardinal.West:
        this.direction = Cardinal.South;
        break;
      case Cardinal.South:
        this.direction = Cardinal.East;
        break;
      case Cardinal.East:
        this.direction = Cardinal.North;
        break;
    }
  }
  // fonction pour avancer soit en x ou en y en fonction de Cardinal
  private moveForward(room: Room): void {
    let newX = this.x;
    let newY = this.y;

    switch (this.direction) {
      case Cardinal.North:
        newY++;
        break;
      case Cardinal.East:
        newX++;
        break;
      case Cardinal.West:
        newX--;
        break;
      case Cardinal.South:
        newY--;
        break;
    }
    if (room.isValidPosition(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  // lire les instruction 'D' 'G' ou 'A'
  execute(instructions: string, room: Room): void {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];

      // gerer les cas ou l'instruction est entrée en minuscule
      // puis attribuer les fonctions tourner a gauche ou droite et avancer en fonction de la lettre
      if (instruction.toUpperCase() === "D") {
        this.turnRight();
      } else if (instruction.toUpperCase() === "G") {
        this.turnLeft();
      } else if (instruction.toUpperCase() === "A") {
        this.moveForward(room);
      }
    }
  }

  // obtenir la position finale
  getFinalPosition(): string {
    return `X=${this.x}, Y=${this.y}, ${this.direction}`;
  }
}

//------------------------------TEST----------------------------------

// dimension de la pièce 10 par 10
const room = new Room(10, 10);

// position initial
const position = new Vacuum(5, 5, Cardinal.North);

// excecution des instructions
position.execute("DADADADAA", room);

// obtention de la position finale
console.log(position.getFinalPosition());
