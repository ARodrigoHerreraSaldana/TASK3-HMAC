export class intransitiveDice{
constructor(id , sides)
{   
    this.id = id
    this.sides=sides
}
}

export function generateDices(args){
    let instanceArray=[]
    if(Array.isArray(args)){
    for(let i=0; i<args.length; i++)
    {
        console.log(i);
        let dice = new intransitiveDice(i+1,args[0])
        instanceArray.push(dice)
        
    }
    return instanceArray
}
else
{
    console.error('it is not an array')
}
}

export function showObject(args)
{
    args.forEach(element => {
        console.log(element)
    });
}
export function SelectFromBatch(id,args)
{
    return args.find(element => element.id==id);
}

// try{
//     const arrayDices=generateDices([ '1,2,3,4,5,6', '1,2,3,4,5,0' ]);
//     //showObject(arrayDices)
//     const selectedDice=SelectFromBatch(2,arrayDices)
//     console.log(selectedDice);
// }
// catch(e)
// {
//     console.error(e)
//     process.exit(1);
// }
