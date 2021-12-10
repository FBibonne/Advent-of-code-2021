export const d4Extractor = (input) => {
  const array = input.split("\n");
  const drawns = array[0].split(",");
  const size=5
  const boardsBuilder=new BoardsBuilder(size);
  array.slice(1).forEach(line=> {
    if (line!==""){
      boardsBuilder.append(line);
    }
  });
  const tables=boardsBuilder.boards;

  return {drawns, tables, size };
};

class BoardsBuilder{

  boards=[];

  constructor(size){
    this.size=size;
    this.current=[];
  }
  

  append(line){
    if(this.current.push(line.split(" ").filter(x=>x!==""))===this.size){
      this.boards.push(this.current);
      this.current=[];
    }
  }

}
