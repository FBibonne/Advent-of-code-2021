export const d2Extractor = (input) =>
  input
    .split("\n")
    .map(v => new Movement(v));

export class Movement{
  constructor(chaine) {
    const splited=chaine.split(" ")
    .map((v, i) => (i === 0 ? v : parseInt(v, 10)))
    this.movementType = splited[0];
    this.x=parseInt(splited[1], 10);
  }
}

export class Position{
  constructor(){
    this.horizontal=0;
    this.depth=0;
  }

  /**
   * @param {Movement} movement
   */
  //set move(movement){
  move=(movement)=>{
    if(movement.movementType==='forward'){
      this.horizontal=this.horizontal+movement.x;
    }else if(movement.movementType==='down'){
      this.depth=this.depth+movement.x;
    }else{
      this.depth=this.depth-movement.x;
    }
  }
}

export class PositionWithAim{
  constructor(){
    this.horizontal=0;
    this.depth=0;
    this.aim=0;
  }

  /**
   * @param {Movement} movement
   */
  //set move(movement){
  move=(movement)=>{
    if(movement.movementType==='forward'){
      this.horizontal=this.horizontal+movement.x;
      this.depth=this.depth+movement.x*this.aim;
    }else if(movement.movementType==='down'){
      this.aim=this.aim+movement.x;
    }else{
      this.aim=this.aim-movement.x;
    }
  }

}