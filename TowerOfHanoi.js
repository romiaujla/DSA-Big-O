let count = 0;
let numOfDiscs = 3;
// initializing a vaariable that will
// store the initial rod state
let initialRod = [];
function printTOHforNum(num){
  
  // creating the rod which is O(N)
  // where N is the num provided by the user
  for(let i = 1; i <= num; i++){
    initialRod.push(i);
  }

  // calling the recurTOHMoves on the initialRod
  // to print all the moves
  printRods(initialRod);
  recurTOHMoves(initialRod);
  console.log(`Num of Moves = ${count}`);
  return;
}

function recurTOHMoves(rodA, rodB=[], rodC=[]){

  if(!rodA.length && !rodB.length){
    return;
  }

  // rodA[0] = 3;
  // rodB[0] = 2;
  // rodC[0] = 1;
  const rodWithSmallestDisc = findRodWithSmallestDisc(rodA, rodB, rodC);
  
  switch(rodWithSmallestDisc){

    // If rodA had the smallest
    case 'A':
      rodB.unshift(rodA.shift());

      // print after first move
      printRods(rodA, rodB, rodC);

      // check base case
      if(baseCase(rodA, rodB))
        return;

      if(!rodA[0] && !rodC[0]){
        recurTOHMoves(rodA, rodB, rodC);
      }else if(rodA[0] < rodC[0] || !rodC[0]){
        rodC.unshift(rodA.shift());
      }else{
        rodA.unshift(rodC.shift());
      }

      // print after second move
      printRods(rodA, rodB, rodC);
      recurTOHMoves(rodA, rodB, rodC);
      break;

    // IF RodB had the smallest num
    case 'B':
      rodC.unshift(rodB.shift());

      // print after first move
      printRods(rodA, rodB, rodC);

      if(baseCase(rodA, rodB))
        return;
      
      if(!rodA[0]){
        rodA.unshift(rodB.shift());
      }else if(!rodB[0]){
        rodB.unshift(rodA.shift());
      }else if(rodA[0] < rodB[0]){
        rodB.unshift(rodA.shift());
      }else{
        rodA.unshift(rodB.shift());
      }

      // print after second move
      printRods(rodA, rodB, rodC);
      recurTOHMoves(rodA, rodB, rodC);
      break;

    
    // If RodC had the smallest
    case 'C':
      rodA.unshift(rodC.shift());
      
      // print after first move
      printRods(rodA, rodB, rodC);

      if(baseCase(rodA, rodB))
        return;

      if(!rodB[0]){
        rodB.unshift(rodC.shift());
      }else if(!rodC[0]){
        rodC.unshift(rodB.shift());
      }else if(rodB[0] < rodC[0]){
        rodC.unshift(rodB.shift());
      }else{
        rodB.unshift(rodC.shift());
      }

      // print after second move
      printRods(rodA, rodB, rodC);
      recurTOHMoves(rodA, rodB, rodC);
      break;
      
  }
}

function baseCase(rodA, rodB){
  if(!rodA[0] && !rodB[0])
    return true;

  return false;
}

function printRods(rodA, rodB=[], rodC=[]){
  count += 1;
  console.log(`Rod A: `, rodA);
  console.log(`Rod B: `, rodB);
  console.log(`Rod C: `, rodC);
  console.log(`\n`);
}

function printGraphicalRods(height, rod=[]){
  process.stdout.write('  ');
  for(let i = 0; i < height*2; i++){
      if(height === i){
        process.stdout.write('|');
      }
      process.stdout.write('-');
  }
  process.stdout.write('\n');
  for(let i = 0; i < height*3;i++)
    process.stdout.write('-');
}


function findRodWithSmallestDisc(rodA, rodB, rodC){
  
  if(rodA[0] < rodB[0] || !rodB[0]){
    if(rodA[0] < rodC[0] || !rodC[0])
      return 'A';
  }
  
  if(rodB[0] < rodC[0] || !rodC[0]){
    return 'B';
  } else{
    return 'C';
  }
  
}

printTOHforNum(numOfDiscs);
// printGraphicalRods(numOfDiscs);
